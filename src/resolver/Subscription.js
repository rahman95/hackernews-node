function newLinkSebscribe(parent, args, context, info) {
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

function newVoteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}

const newLink = {
  subscribe: newLinkSebscribe,
  resolve: payload => {
    return payload;
  }
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newLink,
  newVote
};
