import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AiFillEdit } from "react-icons/ai";
import ProductForm from "../pages/admin/admin product/ProductForm";
import { deleteProduct } from "@/slice/adminActionSlice";

import { useAppDispatch } from "@/store";

type AdminActionProps = {
  productId?: string;
  productName?: string;
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

function AdminAction({ productId, productName }: AdminActionProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const handleClose = async () => {
    await wait().then(() => setOpen(false));
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      {productId ? (
        <div className="flex flex-row justify-center  items-center gap-2">
          <DialogTrigger
            onClick={() => {
              setIsEdit(true);
            }}
            asChild
          >
            <Button variant={"outline"}>編輯</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              onClick={() => {
                setIsEdit(false);
              }}
            >
              移除
            </Button>
          </DialogTrigger>
        </div>
      ) : (
        <DialogTrigger
          onClick={() => {
            setIsEdit(false);
          }}
          asChild
        >
          <Button variant={"outline"}>新增產品</Button>
        </DialogTrigger>
      )}
      <DialogContent
        className={cn("max-h-screen overflow-y-scroll lg:overflow-hidden", {
          "max-w-6xl ": isEdit || !productId,
        })}
      >
        <DialogHeader>
          <DialogTitle asChild>
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
        {isEdit || !productId ? (
          <div className="py-4">
            {<ProductForm productId={productId} handleClose={handleClose} />}
          </div>
        ) : (
          <div>
            <h1>確定刪除本產品?</h1>
            <DialogFooter>
              <Button
                type="button"
                onClick={async () => {
                  if (!productId) return;
                  await dispatch(deleteProduct(productId));
                  handleClose();
                  
                }}
              >
                Confirm
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AdminAction;
