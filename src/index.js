const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./dist/generated/prisma-client");
const resolvers = require("./resolver");

// tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
  typeDefs: "./src/schema/index.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
