const { GraphQLServer } = require("graphql-yoga");

// defines a simple Query type with one field called info which is of type of string and can never be null
const typeDefs = `
type Query {
  info: String!
}
`;

// resolver has structure of the type definition
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
};

// tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
