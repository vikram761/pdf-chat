import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { File } from "@prisma/client";

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
  getMessage: privateProcedure.input(z.string()).query(({ ctx, input }) => {
    console.log("req");
    const messages = prisma.message.findMany({
      where: {
        AND: [
          {
            fileId: input,
          },
          {
            userId: ctx.userId,
          },
        ],
      },
    });

    return messages;
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const files: File[] = await prisma.file.findMany({
      where: {
        userId: ctx.userId,
      },
    });

    return files;
  }),
  deleteFile: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const fileId: string = input;
      console.log("delete event triggered");
      let data = "";
      try {
        data = await prisma.file.delete({
          where: {
            id: fileId,
          },
        });
      } catch (err) {
        console.error(err);
      }

      return data;
    }),
});

export type AppRouter = typeof appRouter;
