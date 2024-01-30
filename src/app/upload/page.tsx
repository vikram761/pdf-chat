import FiledropWrapper from "@/components/FiledropWrapper";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <div>
        <h1 className="font-bold text-6xl  px-4 text-center mt-16 mb-2 font-montserrat">
          Add Knowledge Base
        </h1>
        <p className="text-slate-400 text-center text-sm ">Upload your files</p>
      </div>
      {/* drop file  */}
      <FiledropWrapper />
    </div>
  );
};

export default page;
