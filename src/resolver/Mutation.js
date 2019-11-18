const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function createLink(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    author: {
      connect: { id: userId }
    }
  });
}

function updateLink(parent, args, context, info) {
  const link = links.find(link => link.id === args.id);

  link.description = args.description || link.description;
  link.url = args.url || link.url;

  return link;
}

function deleteLink(parent, args, context, info) {
  const updatedLinks = links.filter(link => link.id !== args.id);

  links = updatedLinks;

  return true;
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({
    ...args,
    password
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });

  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
}

module.exports = {
  createLink,
  updateLink,
  deleteLink,
  signup,
  login,
  vote
};
