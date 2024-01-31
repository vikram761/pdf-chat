import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1>landing page</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
