"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

export default function Home() {
  // const session = await getServerSession(authOptions);
  const session = useSession();
  return (
    <>
      <h1>landing page</h1>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
