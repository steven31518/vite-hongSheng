import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { FileWithPath } from "react-dropzone";
import { cn } from "@/lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "@/store";
import { updateImage } from "@/slice/productPicSlice";
import { Separator } from "@/components/ui/separator";
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
  const dispatch = useAppDispatch();
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

  const handleUpload = () => {
    if (filesPack.length === 0) return;
    dispatch(updateImage(filesPack));
  };

  const files = filesPack.map((file, i) => (
    <>
      <div className="grid grid-cols-12 gap-4" key={file.name}>
        <div className="col-span-4">
          <img src={file.preview} alt="" />
        </div>
        <div className="col-span-8 flex flex-col justify-end gap-4">
          <span className="text-xs">
            {i + 1}.{file.name}
          </span>
          <Button variant={"outline"}>
            <AiOutlineClose className=" text-destructive text-2xl space-x-3 space-y-3 hover:opacity-80 cursor-pointer" />
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
    </>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      filesPack.forEach((file) => URL.revokeObjectURL(file.preview as string));
    },
    [filesPack]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-screen">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <section className="container-full max-h-screen flex flex-col space-y-4">
          <div
            {...getRootProps({
              className: cn(
                "dropzone rounded-lg border-2 w-full h-[100px] p-4",
                style
              ),
            })}
          >
            <input {...getInputProps()} />
            {isDragAccept && <p>All files will be accepted</p>}
            {isDragReject && <p>Some files will be rejected</p>}
            {!isDragActive && <p>Drop some files here ...</p>}
          </div>

          {filesPack.length > 0 && (
            <div className="rounded-md border w-full">
              <ScrollArea className="col-span-8 h-[300px]">
                <aside className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                    Your files
                  </h4>
                  <ul>{files}</ul>
                </aside>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          )}
        </section>
        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setFilesPack([])}
          >
            clean
          </Button>
          <Button type="button" onClick={handleUpload}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPicDropzone;