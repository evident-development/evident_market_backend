function products(parent, args, context) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}

export { products };
