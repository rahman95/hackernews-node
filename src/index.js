const { GraphQLServer } = require("graphql-yoga");

// defines a simple Query type with one field called info which is of type of string and can never be null
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
    user: User!
}

type User {
    id: ID!
    name: String!
    email: String!
}
`;

// resolver has structure of the type definition
let user1 = {
  id: "user-1",
  name: "Rahman Younus",
  email: "rahman_younus@live.co.uk"
};

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
    user: user1
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  },

  User: {
    id: parent => parent.id,
    name: parent => parent.name,
    email: parent => parent.email
  }
};

// tells the server what API operations are accepted and how they should be resolved.
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
