"use client";

import { trpc } from "@/app/_trpc/client";
import { Message } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { fileId: string } }) {
  const { fileId } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const data = trpc.getMessage.useQuery(fileId);
  useEffect(() => {
    console.log("update");
    setMessages(data.data);
  }, [messages, data]);

  return (
    <div>
      {fileId}
      <p>{JSON.stringify(messages)}</p>
    </div>
  );
}
