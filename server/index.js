const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
PORT = process.env.PORT || 8000;
const MONGODB = process.env.REACT_APP_MONGODB_URI;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

//connect to Mongo DB

mongoose //Added  useUnifiedTopology: true
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT || 8000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
