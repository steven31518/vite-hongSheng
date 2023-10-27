import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { FileWithPath } from "react-dropzone";
import { cn } from "@/lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProductPicDropzone = () => {
  const [filesPack, setFilesPack] = useState<FileWithPath[]>([]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    maxFiles: 10,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFilesPack(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const style = useMemo(
    () => ({
      ...(isFocused && { "border-primary": isFocused }),
      ...(isDragReject && { "border-destructive": isDragReject }),
      ...(isDragAccept && { "border-success": isDragAccept }),
    }),
    [isFocused, isDragReject, isDragAccept]
  );
  const handleView = () => {
    if (filesPack.length === 0) return;
    filesPack.map((file) => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
  };
  const files = filesPack.map((file, i) => (
    <li key={file.name}>
      {i + 1 + "."}
      {file.name} - {file.size} bytes
    </li>
  ));

  const thumbs = filesPack.map((file) => (
    <div key={file.name} className="h-[200px] relative">
      <AiOutlineClose
        className="absolute top-0 right-0 text-destructive text-2xl space-x-3 space-y-3 hover:opacity-80 cursor-pointer"
        onClick={() => {URL.revokeObjectURL(file.preview as string);
          setFilesPack(filesPack.filter((item) => item.name !== file.name));
          
        }}
      />
      <img
        src={file.preview}
        className="object-cover h-full w-full rounded-md"
        // Revoke data uri after image is loaded
        alt="image"
      />
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    console.log("revoked");
    return () =>
      filesPack.forEach((file) => URL.revokeObjectURL(file.preview as string));
  }, []);

  return (
    <section className="container-full grid grid-rows-2 grid-flow-col gap-4">
      <div
        {...getRootProps({
          className: cn("dropzone rounded-lg border-2 w-full p-4", style),
        })}
      >
        <input {...getInputProps()} />
        {isDragAccept && <p>All files will be accepted</p>}
        {isDragReject && <p>Some files will be rejected</p>}
        {!isDragActive && <p>Drop some files here ...</p>}
      </div>
      <div className="grid grid-cols-12 gap-2">
        <ScrollArea className="h-[100px] col-span-8">
          <aside className="text-xs">
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <div className="flex flex-col justify-center space-y-4 col-span-4 text-xs">
          <Button variant={"outline"} type="button">
            update
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleView}>
                view
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[500px]">
                <div className="grid grid-cols-2 gap-4">{thumbs}</div>
              </ScrollArea>

              <DialogFooter>
                <Button type="submit">update</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ProductPicDropzone;
