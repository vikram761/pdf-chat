"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { router } from "@/server/trpc";

import { File, User } from "@prisma/client";
import { dataTagSymbol } from "@tanstack/react-query";
import { Link, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  let { data: files, isLoading } = trpc.getUserFiles.useQuery();
  const deleteFile = trpc.deleteFile.useMutation();

  if (isLoading) return <h1>loading...</h1>;

  if (files === undefined || files.length === 0)
    return (
      <h1 className="w-full flex justify-center h-[70vh] items-center">
        none found...
      </h1>
    );

  return (
    <div>
      <Table className="max-w-5xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] truncate">Name</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Chat</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file: File) => {
            return (
              <TableRow key={file.id}>
                <TableCell className="  ">{file.name}</TableCell>
                <TableCell className="truncate max-w-2xl">
                  {" "}
                  <button onClick={() => router.push(file.url)}>
                    {file.url}
                  </button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => router.push(`/chat/${file.id}`)}
                    variant={"outline"}
                  >
                    chat
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => {
                      deleteFile.mutate(file.id);
                    }}
                  >
                    <Trash />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
