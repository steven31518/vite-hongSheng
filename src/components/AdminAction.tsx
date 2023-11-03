import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { AiFillEdit } from "react-icons/ai";
import ProductForm from "./ProductForm";

type AdminActionProps = {
  productId?: string;
  productName?: string;
};
function AdminAction({ productId, productName }: AdminActionProps) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Dialog>
      {productId ? (
        <div className="flex flex-row justify-center  items-center gap-2">
          <DialogTrigger
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <Button variant={"outline"}>編輯</Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button variant={"outline"}>移除</Button>
          </DialogTrigger>
        </div>
      ) : (
        <DialogTrigger
          onClick={() => {
            setIsEdit(false);
          }}
        >
          <Button variant={"outline"}>新增產品</Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-6xl max-h-screen overflow-y-scroll lg:overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {productId ? (
              <div className="flex items-center gap-2">
                <h1>{productName}</h1>
                <small>
                  <Button
                    variant={"ghost"}
                    onClick={() => navigator.clipboard.writeText(productId)}
                  >
                    <AiFillEdit className="me-2"></AiFillEdit>
                    複製ID
                  </Button>
                </small>
              </div>
            ) : (
              <h1>新增您的產品</h1>
            )}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="py-4">{<ProductForm isEdit={isEdit} />}</div>
        {/* <DialogFooter>
          <Button type="submit">Confirm</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default AdminAction;
