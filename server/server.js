const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data

const posts = [
    {
        id: 0,
        created: 1506045,
        user_id: 0,
        text: "This is a post by Justin",
        object_set_id: undefined,
        edited: undefined,
        views: 5,
        upvotes: 2,
        downvotes: 3,
        parent: undefined
    },
    {
        id: 1,
        created: 1504567,
        user_id: 1,
        text: "This is a post by Tim with pictures",
        object_set_id: 0,
        edited: undefined,
        views: 10,
        upvotes: 200,
        downvotes: 1,
        parent: undefined
    },
    {
        id: 2,
        created: 1504569,
        user_id: 0,
        text: "This is a comment Justin put on Tim's popular post",
        object_set_id: 0,
        edited: undefined,
        views: 2,
        upvotes: 2,
        downvotes: 100,
        parent: 1
    }
];

const users = [
    {
        id: 0,
        created: 34534,
        username: 'jrcichra',
        bio: 'Pretty cool guy',
        status: 'online',
        avatar: 'https://loremflickr.com/320/240',
    },
    {
        id: 1,
        created: 34243,
        username: 'tjcichra',
        bio: 'A brother',
        status: 'offline',
        avatar: 'https://loremflickr.com/320/240',
    },
];

// The GraphQL schema in string form
const typeDefs = `
    type Query { 
      users: [User], 
      user(id: ID!): User, 
      posts: [Post], 
      post(id: ID!): Post 
    }
    type User  { 
        id: ID!, 
        created: Int, 
        username: String, 
        bio: String, 
        status: String, 
        avatar: String, 
        posts: [Post] 
    }
    type Post { 
        id: ID!, 
        created: Int, 
        user: User, 
        text: String, 
        object_set_id: Int, 
        edited: Int, 
        views: Int, 
        upvotes: Int, 
        downvotes: Int, 
        parent: Post 
    }
`;

// The resolvers
const resolvers = {
    Query: {
        user: (parent, args, context, info) => {
            return users.find(user => user.id === Number(args.id));
        },
        post: (parent, args, conetxt, info) => {
            return posts.find(post => post.id === Number(args.id));
        },
        posts: () => posts,
        users: () => users,
    },
    User: {
        posts: (parent, args, context, info) => {
            console.log(posts.filter(post => post.user_id === Number(parent.id)))
            return posts.filter(post => post.user_id === Number(parent.id))
        }
    },
    Post: {
        parent: (p,args,context,info) => {
            return posts[Number(p.parent)]
        },
        user: (p,args,context,info) => {
            return users.find(user => user.id === Number(p.user_id))
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
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});