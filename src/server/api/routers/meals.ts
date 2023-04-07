import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";

export const mealsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.meal.findMany({
      take: 100,
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  createMealForUser: privateProcedure
    .input(z.object({ name: z.string(), userId: z.string(), calories: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.meal.create({
        data: {
          name: input.name,
          user: {
            connect: {
              id: input.userId,
            },
          },
          calories: input.calories,
        },
      });
    }
  ),
});
