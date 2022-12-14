import { z } from "zod";
import { createRouter } from "./context";

export const postProtectedRouter = createRouter()
  .mutation("create", {
    input: z.object({
      title: z.string(),
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.email) return;
      await ctx.prisma.post.create({
        data: {
          ...input,
          author: {
            connect: {
              email: ctx.session.user.email,
            },
          },
        },
      });
    },
  })
  .query("getDrafts", {
    async resolve({ ctx }) {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.email) return;
      return await ctx.prisma.post.findMany({
        where: {
          author: {
            email: ctx.session.user.email,
          },
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    },
  });

export const postRouter = createRouter()
  .query("getAllPosts", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany();
    },
  })
  .query("getById", {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    },
  });
