"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { error } from "console";
import { useUploadThing as useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";

interface FiledropWrapperProps {}

const FiledropWrapper: FC<FiledropWrapperProps> = ({}) => {
  const [progress, setProgress] = useState<number>(0);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const router = useRouter();
  const { startUpload } = useUploadThing("pdfUploader");
  const { toast } = useToast();

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/chat/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <div>
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFiles) => {
          setIsUploading(true);

          const res = await startUpload(acceptedFiles);
          if (!res) {
            return toast({
              title: "Somethig went wrong!",
              description: "please try again",
              variant: "destructive",
            });
          }

          const [fileResponse] = res;
          const key = fileResponse?.key;
          if (!key) {
            return toast({
              title: "Somethig went wrong!",
              description: "please try again",
              variant: "destructive",
            });
          }

          startPolling({ key });
          setIsUploading(false);
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <section className="flex justify-center mt-8 mx-4 ">
            <div
              {...getRootProps()}
              className="bg-slate-50 max-w-2xl w-full shadow-lg h-60 flex items-center justify-center border rounded-md hover:bg-slate-100 "
            >
              <input {...getInputProps()} type="file" />
              <div className="flex-col gap-3 items-center justify-center pt-5 pb-6">
                <div className="w-full flex justify-center">
                  <IoMdCloudUpload className="text-slate-400 h-16 w-16" />
                </div>
                <p className="text-center px-4 w-full">
                  <span className=" font-medium">
                    Drag {"'n'"} drop file here
                  </span>{" "}
                  or click to select files
                </p>

                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="flex justify-center mt-6 ">
                    <div className="outline-4  bg-white py-2  max-w-xs w-full rounded-md overflow-hidden flex  outline-gray-500 border-gray-400  border-2">
                      <div className="px-3 py-2 h-full grid items-center">
                        <FaRegFileAlt className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="px-3 py-2 h-full text-sm truncate overflow-hidden  font-semibold w-full">
                        {acceptedFiles[0].name}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {isUploading == true ? (
        <div className=" flex flex-col mt-4">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div className="flex gap-2 justify-center">
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <p>loading your document</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FiledropWrapper;
