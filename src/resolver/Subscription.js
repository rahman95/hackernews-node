function newLinkSebscribe(parent, args, context, info) {
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

const newLink = {
  subscribe: newLinkSebscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newLink
};
