const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// Define your GraphQL schema using GraphQL SDL (Schema Definition Language)
const typeDefs = gql`
  type Comment {
    id: ID!
    text: String!
  }

  type Query {
    comments: [Comment]
  }

  type Mutation {
    addComment(text: String!): Comment
  }
`;

// In-memory data store for simplicity; replace this with a database in a real app
let comments = [];

// Define resolvers for your schema
const resolvers = {
  Query: {
    comments: () => comments,
  },
  Mutation: {
    addComment: (_, { text }) => {
      const newComment = {
        id: String(comments.length + 1),
        text,
      };
      comments.push(newComment);
      return newComment;
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo Server middleware to Express
server.applyMiddleware({ app });

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
});
