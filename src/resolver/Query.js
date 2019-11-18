function info() {
  return `This is the API of a Hackernews Clone`;
}

async function feed(parent, args, context, info) {
  const whereFilter = getFilter(args.filter);

  const links = await context.prisma.links({
    where: whereFilter
  });

  return links;
}

function getFilter(filter) {
  if (filter.length === 0) {
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
