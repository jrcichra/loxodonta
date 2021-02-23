const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const moment = require('moment');
const cors = require('cors');
const minio = require('minio');

const BUCKETNAME = 'loxodonta';

// Database
const Knex = require("knex");

const client = Knex({
    client: "mysql", connection: {
        host: "mariadb", password: "changeme", user: "api", database: "loxodonta",
        typeCast: function (field, next) {
            if (field.type === 'TIMESTAMP') {
                var value = field.string();
                var m = moment(value).unix();
                if (isNaN(m)) {
                    return undefined;
                }
                return m;
            }
            return next();
        }
    }
});

// Minio client
const minioClient = new minio.Client({
    endPoint: 'minio',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ROOT_USER,
    secretKey: process.env.MINIO_ROOT_PASSWORD,
});

// Make the bucket if it doesn't already exist
minioClient.bucketExists(BUCKETNAME, function (err, exists) {
    if (!exists) {
        minioClient.makeBucket(BUCKETNAME, 'us-east-1', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});

// The GraphQL schema in string form
const typeDefs = gql`
    type Query { 
      users: [User], 
      user(id: ID, username: String): User, 
      posts: [Post], 
      post(id: ID!): Post,
      feed(id: ID!,top: Int) : [Post],
    }
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    type Mutation {
        newPost(post_text: String!, post_user_id: Int!, post_parent: Int): Post!
        newFile(file: Upload!): File!
    }
    type User  { 
        user_id: ID!, 
        user_created: Float, 
        user_name: String, 
        user_bio: String, 
        user_status: String, 
        user_avatar: Object, 
        user_posts(from: Int, to: Int, top: Int): [Post],
        user_friends: [User]
    }
    type Post { 
        post_id: ID!, 
        post_created: Float, 
        post_user: User, 
        post_text: String, 
        post_object_set: ObjectSet, 
        post_edited: Float, 
        post_views: Float, 
        post_upvotes: Float, 
        post_downvotes: Float, 
        post_parent: Post 
    }
    type Object {
        object_id: ID!,
        object_url: String,
        object_created: Float,
        object_order: Int
    }
    type ObjectSet {
        object_set_id: ID!,
        object: Object
    }
`;

// The resolvers
const resolvers = {
    Query: {
        user: (parent, args, context, info) => {

            if (args.id) {
                return client.from("users").where({ user_id: Number(args.id) }).first();
            } else if (args.username) {
                return client.from("users").where({ username: Number(args.username) }).first();
            } else {
                return client.from("users").orderBy("user_created", 'desc');
            }
        },
        post: (parent, args, context, info) => {
            return client.from("posts").where({ post_id: Number(args.id) }).first();
        },
        posts: () => client.from("posts").orderBy("post_created", 'desc'),
        users: () => client.from("users").orderBy("user_created", 'desc'),
        feed: (parent, args, context, info) => {
            let base = client.select('p.*').from({ "u": 'users' }).leftJoin({ "f": 'friends' }, 'u.user_id', '=', 'f.user_id').leftJoin({ "u2": 'users' }, 'u2.user_id', '=', 'f.user_friend_id').leftJoin({ 'p': 'posts' }, 'p.post_user_id', '=', 'u2.user_id').where({ 'u.user_id': Number(args.id) }).orderBy("post_created", 'desc')
            if (args.top !== undefined) {
                return base.limit(args.top)
            }
            return base;
        },
    },
    Mutation: {
        newPost: async (_, { post_user_id, post_text, post_parent }, { dataSources }) => {
            console.log("Made it into newPost");
            let id = await client.into("posts").insert({ post_text, post_user_id, post_parent });
            console.log(`newPostID=${id}`);
            // Not sure why this is returning all nulls?
            return client.from("posts").where({ post_id: id }).first();
        },
        newFile: async (parent, { file }) => {
            const { stream, filename, mimetype, encoding } = await file;
            const metaData = {
                'Content-Type': mimetype,
            };
            // put it in the bucket
            minioClient.putObject(BUCKETNAME, filename, stream, (err, objInfo) => {
                console.log("shouldn't this run?");
                if (err) {
                    console.log(err);
                } else {
                    console.log('File uploaded successfully.');
                    console.log(objInfo);
                }
            });
            return { filename, mimetype, encoding, url: '' };
        },
    },
    User: {
        user_posts: (parent, args, context, info) => {
            let base = client.from("posts").where({ post_user_id: Number(parent.user_id) });
            if (args.to && args.from) {
                return base.andWhereRaw(`unix_timestamp(post_created) between ${args.to} and ${args.from}`).orderBy("post_created", 'desc')
            } else if (args.to !== undefined) {
                return base.andWhereRaw(`unix_timestamp(post_created) <= ${args.to}`).orderBy("post_created", 'desc')
            } else if (args.from !== undefined) {
                return base.andWhereRaw(`unix_timestamp(post_created) >= ${args.from}`).orderBy("post_created", 'desc')
            } else if (args.top !== undefined) {
                return base.orderBy("post_created", 'desc').limit(args.top)
            } else {
                return base.orderBy("post_created", 'desc')
            }
        },
        user_friends: (parent, args, context, info) => {
            return client.select('u2.*').from({ "u": 'users' }).leftJoin({ "f": 'friends' }, 'u.user_id', '=', 'f.user_id').leftJoin({ "u2": 'users' }, 'u2.user_id', '=', 'f.user_friend_id').where({ 'u.user_id': Number(parent.user_id) })
        },
        user_avatar: (parent, args, context, info) => {
            return client.select('o.*').from({ 'o': 'objects' }).join({ 'u': 'users' }, 'o.object_id', '=', 'u.user_avatar_object_id').where({ 'u.user_id': Number(parent.user_id) }).first()
        },
        user_status: (parent, args, context, info) => {
            return client.select('status_name').from({ 's': 'statuses' }).join({ 'u': 'users' }, 's.status_id', '=', 'u.user_status_id').where({ 'u.user_id': Number(parent.user_id) }).first().pluck('status_name').then((statuses) => { return statuses[0] })
        },
    },
    Post: {
        post_parent: (p, args, context, info) => {
            return client.from("posts").where({ post_id: Number(p.post_user_id) }).first();
        },
        post_user: (parent, args, context, info) => {
            return client.from("users").where({ user_id: Number(parent.post_user_id) }).first();
        },
        post_object_set: (parent, args, context, info) => {
            return client.select('os.*').from({ 'os': 'object_sets' }).join({ 'p': 'posts' }, 'p.post_object_set_id', '=', 'os.object_set_id').where({ 'p.post_id': Number(parent.post_id) }).first();
        }
    },
    ObjectSet: {
        object: (parent, args, context, info) => {
            return client.select('o.*').from({ 'o': 'objects' }).where({ 'o.object_id': Number(parent.object_id) }).first();
        }
    }
};

// Put together a schema
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Initialize the app
const app = express();
//cors
app.use(cors());

// The GraphQL endpoint
server.applyMiddleware({ app });

// Start the server
app.listen(3001, () => {
    var os = require("os");
    var hostname = os.hostname();
    console.log(`🚀 Go to http://${hostname}:3001${server.graphqlPath} to run queries!`);
});