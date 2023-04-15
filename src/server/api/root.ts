import { createTRPCRouter } from "~/server/api/trpc";
import { mealsRouter } from "~/server/api/routers/meals";
import { chatRouter } from "~/server/api/routers/chat";
import { profileRouter } from "~/server/api/routers/profile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  meals: mealsRouter,
  chat: chatRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
