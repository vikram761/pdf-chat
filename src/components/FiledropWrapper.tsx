"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { error } from "console";

interface FiledropWrapperProps {}

const FiledropWrapper: FC<FiledropWrapperProps> = ({}) => {
  const [file, setFile] = useState<File | null>(null);
  const [canUpload, setCanUpload] = useState<boolean>(false);

  const router = useRouter();

  const handleClick = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("file uploaded");
      } else {
        throw new Error("upload failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Dropzone
        multiple={false}
        onDrop={(acceptedFiles) => {
          setFile(acceptedFiles[0]);
          setCanUpload(true);
        }}
        onDropRejected={() => {
          setCanUpload(false);
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <section className="flex justify-center mt-8 mx-4 ">
            <div
              {...getRootProps()}
              className="bg-slate-50 max-w-2xl w-full shadow-lg h-60 flex items-center justify-center border rounded-md hover:bg-slate-100 "
            >
              <input {...getInputProps()} />
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
      <div className="w-full flex justify-center mt-8">
        <Button
          className="px-6 py-4 disabled:bg-gray-400"
          disabled={!canUpload}
          onClick={handleClick}
        >
          Upload files
        </Button>
      </div>
    </div>
  );
};

export default FiledropWrapper;
