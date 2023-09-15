const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGODB =
  "mongodb+srv://gilbertperezdt:n2ZTBdsua4tShlbU@jwtlogin.vvscfi0.mongodb.net/?retryWrites=true&w=majority";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

//connect to Mongo  DB

mongoose //Added  useUnifiedTopology: true
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT || 4000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
