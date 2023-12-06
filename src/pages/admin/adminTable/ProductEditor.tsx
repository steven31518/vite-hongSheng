import { DialogButton } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import ProductForm from "../admin product/ProductForm";
import { useDeleteAdminProduct } from "../admin product/delete admin products hook";
import { LuPackagePlus } from "react-icons/lu";


export function ProductEditor({ id }: { id?: string }) {
  const { mutate, isPending: deleteIsPending } = useDeleteAdminProduct();

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <DialogButton
        name={id ? "編輯" : <LuPackagePlus className="text-2xl" />}
        title={id ? "編輯商品" : "新增商品"}
        description={id ? `編輯編號${id}` : "新增商品"}
        className="max-w-6xl"
      >
        <ProductForm productId={id} />
      </DialogButton>
      {id && (
        <Button
          disabled={deleteIsPending}
          variant={"destructive"}
          onClick={() => {
            mutate(id);
          }}
        >
          移除
        </Button>
      )}
    </div>
  );
}
