import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="text-black bg-slate-100 py-3 shadow-lg flex justify-center items-center">
      <div className="max-w-6xl w-full flex justify-between md:px-4">
        <div className="flex gap-x-6 max-md:gap-x-3">
          <h2 className=" font-bold text-2xl my-auto">ECHO</h2>
          <div className="flex gap-4 items-center text-md">
            <Link
              href={"/upload"}
              className="hover:text-slate-600 delay-50 transition-all ease-in py-1 hover:-translate-y-1"
            >
              Upload
            </Link>
            <Link
              href={"/chat"}
              className="hover:text-slate-700 delay-50 transition-all ease-in py-1 hover:-translate-y-1"
            >
              Chat
            </Link>
            <Link
              href={"/explore"}
              className="hover:text-slate-700 delay-50 transition-all ease-in py-1 hover:-translate-y-1"
            >
              Explore
            </Link>
          </div>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
