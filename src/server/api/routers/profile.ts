// make a request to openai to get a response
import { z } from 'zod';
import { clerkClient } from '@clerk/nextjs/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;
      const [user] = await clerkClient.users.getUserList({
        emailAddress: [username],
      });
      if (!user) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'User not found',
        });
      }
      return user;
    }),
});
