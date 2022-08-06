import { createRouter } from "./context";
import superjson from "superjson";

import { postProtectedRouter, postRouter } from "./post.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("protected_post.", postProtectedRouter);

export type AppRouter = typeof appRouter;
