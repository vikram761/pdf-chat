"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {}

const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      className="px-6 border-2 "
      onClick={() => {
        signOut();
        router.push("/login");
      }}
    >
      LOGOUT
    </Button>
  );
};

export default LogoutButton;
