import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  sayhi: publicProcedure.query(() => {
    console.log("hello");
    return true;
  }),
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const file = await prisma.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });
      return file;
    }),
});

export type AppRouter = typeof appRouter;
