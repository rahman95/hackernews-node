// resolver has structure of the type definition
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;

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

  Mutation: {
    createLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);

      return link;
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
