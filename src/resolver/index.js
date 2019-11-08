// resolver has structure of the type definition
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context) => context.prisma.links()
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  },

  Mutation: {
    createLink: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },

    updateLink: (parent, args) => {
      const link = links.find(link => link.id === args.id);

      link.description = args.description || link.description;
      link.url = args.url || link.url;

      return link;
    },

    deleteLink: (parent, args) => {
      const updatedLinks = links.filter(link => link.id !== args.id);

      links = updatedLinks;

      return true;
    }
  }
};

module.exports = resolvers;
