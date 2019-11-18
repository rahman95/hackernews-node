const Query = require("./Query");
const Mutation = require("./Mutation");
const Subscription = require("./Subscription");
const Link = require("./Link");
const User = require("./User");
const Vote = require("./Vote");

// resolver has structure of the type definition
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote
};

module.exports = resolvers;
