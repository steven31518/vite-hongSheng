import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import ProductForm from "./ProductForm";
type dialogContent = "edit" | "delete";

type AdminActionProps = {
  productId: string;
  productName: string;
};
function AdminAction({ productId, productName }: AdminActionProps) {
  const [dialogContent, setDialogContent] = useState<dialogContent>("edit");
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(productId)}
          >
            複製產品ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="flex flex-row justify-evenly items-center">
            <DialogTrigger
              onClick={() => {
                setDialogContent("edit");
              }}
            >
              <DropdownMenuItem>編輯</DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger
              onClick={() => {
                setDialogContent("delete");
              }}
            >
              <DropdownMenuItem>移除</DropdownMenuItem>
            </DialogTrigger>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-6xl max-h-screen  overflow-y-scroll lg:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{productName}</DialogTitle>
          <DialogDescription>{dialogContent}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {dialogContent === "edit" && <ProductForm />}
        </div>
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
