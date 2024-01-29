import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div>
        <h1 className="font-bold text-6xl  px-4 text-center mt-16 mb-2 font-montserrat">
          Add Knowledge Base
        </h1>
        <p className="text-slate-400 text-center text-sm ">Upload your files</p>
      </div>
      {/* drop file  */}
      <div className="flex justify-center mt-8 ">
        <div className="bg-slate-50 max-w-2xl w-full shadow-lg h-40 flex items-center justify-center border rounded-md">
          <p className="text-gray-400">Drop your pdf file here</p>
        </div>
      </div>
    </>
  );
};

export default page;
