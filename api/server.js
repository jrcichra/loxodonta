const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const moment = require('moment');
const cors = require('cors');
const minio = require('minio');
const tmp = require('tmp');
const fs = require('fs');

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

// The GraphQL schema in string form
const typeDefs = `
    type Query { 
      users: [User], 
      user(id: ID, username: String): User, 
      posts: [Post], 
      post(id: ID!): Post,
      feed(id: ID!,top: Int) : [Post],
    }
    type Mutation {
        newPost(post_text: String!, post_user_id: Int!, post_parent: Int): Post!
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
        }
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
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Initialize the app
const app = express();
//cors
app.use(cors());

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3001, () => {
    var os = require("os");
    var hostname = os.hostname();
    console.log(`Go to http://${hostname}:3001/graphiql to run queries!`);
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
    if (err) {
        minioClient.makeBucket(BUCKETNAME, 'us-east-1', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
});

// Handle an upload
app.use(fileUpload());
app.post('/upload', (req, res) => {

    // Pull out data
    const fileContent = Buffer.from(req.files.content.data, 'binary');
    const fileName = req.files.content.name;
    const mimetype = req.files.content.mimetype;

    const tmpobj = tmp.fileSync();

    fs.writeFile(tmpobj.fd, fileContent, function (err) {
        if (err) return console.log(err);
        // Make a bucket

        const metaData = {
            'Content-Type': mimetype,
        };
        // put it in the bucket
        minioClient.fPutObject(BUCKETNAME, fileName, tmpobj.name, metaData, function (err, etag) {
            if (err) {
                console.log(err);
                res.send({
                    "response_code": 502,
                    "response_message": err,
                });
            } else {
                console.log('File uploaded successfully.');
                res.send({
                    "response_code": 200,
                    "response_message": "Success",
                });
            }
        });
    });
});