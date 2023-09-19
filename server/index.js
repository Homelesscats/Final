const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const PORT = process.env.PORT || 8000;

const MONGODB = process.env.REACT_APP_MONGODB_URI;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Start the server
server
  .listen({ port: PORT })
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
