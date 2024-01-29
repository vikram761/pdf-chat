import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  sayhi: publicProcedure.query(() => {
    console.log("hello");
    return true;
  }),
});

export type AppRouter = typeof appRouter;
