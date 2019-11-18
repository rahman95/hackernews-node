function id(parent) {
  return parent.id;
}

function description(parent) {
  return parent.description;
}

function url(parent) {
  return parent.url;
}

function author(parent, args, context) {
  return context.prisma.link({ id: parent.id }).author();
}

module.exports = {
  id,
  description,
  url,
  author
};
