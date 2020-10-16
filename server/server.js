const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const moment = require('moment');

// Database
const Knex = require("knex");

const client = Knex({
    client: "mysql", connection: {
        host: "smarty4.pk5001z", password: "test", user: "pi", database: "loxodonta",
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
      post(id: ID!): Post 
    }
    type User  { 
        user_id: ID!, 
        user_created: Float, 
        user_name: String, 
        user_bio: String, 
        user_status: String, 
        user_avatar: String, 
        user_posts(from: Int, to: Int, top: Int): [Post],
        user_friends: [User]
    }
    type Post { 
        post_id: ID!, 
        post_created: Float, 
        post_user: User, 
        post_text: String, 
        post_object_set_id: Float, 
        post_edited: Float, 
        post_views: Float, 
        post_upvotes: Float, 
        post_downvotes: Float, 
        post_parent: Post 
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
    },
    User: {
        user_posts: (parent, args, context, info) => {
            let base = client.from("posts").where({ post_user_id: Number(parent.user_id) });
            if (args.to && args.from) {
                return base.andWhereRaw(`unix_timestamp(post_created) between ${args.to} and ${args.from}`).orderBy("post_created", 'desc')
            } else if (args.to) {
                return base.andWhereRaw(`unix_timestamp(post_created) <= ${args.to}`).orderBy("post_created", 'desc')
            } else if (args.from) {
                return base.andWhereRaw(`unix_timestamp(post_created) >= ${args.from}`).orderBy("post_created", 'desc')
            } else if (args.top) {
                return base.orderBy("post_created", 'desc').limit(args.top)
            } else {
                return base.orderBy("post_created", 'desc')
            }
        },
        user_friends: (parent, args, context, info) => {
            return client.select('u2.*').from({ "u": 'users' }).leftJoin({ "f": 'friends' }, 'u.user_id', '=', 'f.user_id').leftJoin({ "u2": 'users' }, 'u2.user_id', '=', 'f.user_friend_id').where({ 'u.user_id': Number(parent.user_id) })
        }
    },
    Post: {
        post_parent: (p, args, context, info) => {
            return posts[Number(p.parent)]
        },
        post_user: (parent, args, context, info) => {
            return client.from("users").where({ user_id: Number(parent.post_user_id) }).first();
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

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3001, () => {
    console.log('Go to http://localhost:3001/graphiql to run queries!');
});
