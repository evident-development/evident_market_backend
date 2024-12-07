import { IContext } from "../types";

export async function findUserById(
  _,
  args: { userId: string },
  context: IContext
) {
  return await context.prisma.user.findUnique({
    where: {
      id: args.userId,
    },
  });
}
