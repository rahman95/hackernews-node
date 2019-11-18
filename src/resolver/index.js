const Query = require("./Query");
const Mutation = require("./Mutation");
const Link = require("./Link");
const User = require("./User");

// resolver has structure of the type definition
const resolvers = {
  Query,
  Mutation,
  Link,
  User
};

module.exports = resolvers;
