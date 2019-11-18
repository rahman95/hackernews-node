function info() {
  return `This is the API of a Hackernews Clone`;
}

async function feed(parent, args, context, info) {
  const whereFilter = getFilter(args.filter);

  const links = await context.prisma.links({
    where: whereFilter,
    skip: args.offset,
    first: args.limit
  });

  return links;
}

function getFilter(filter) {
  if (typeof filter === "undefined" || filter.length === 0) {
    return {};
  }

  return {
    OR: [{ description_contains: filter }, { url_contains: filter }]
  };
}

module.exports = {
  info,
  feed
};
