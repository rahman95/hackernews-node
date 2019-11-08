function createLink(parent, args, context, info) {
  return context.prisma.createLink({
    url: args.url,
    description: args.description
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

module.exports = {
  createLink,
  updatedLink,
  deleteLink,
  signup,
  login,
  post
};
