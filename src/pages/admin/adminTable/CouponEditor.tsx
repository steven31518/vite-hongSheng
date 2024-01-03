import { DialogButton } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { CouponForm } from "../admin coupon/CouponForm";
import { LuPackagePlus } from "react-icons/lu";
import { useCouponDelete } from "../admin coupon/delete coupon hook";
export default function CouponEditor({ id }: { id?: string }) {
  const { mutate, isPending } = useCouponDelete();
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <DialogButton
        name={id ? "編輯" : <LuPackagePlus className="text-2xl" />}
        title={id ? "編輯優惠卷" : "新增優惠卷"}
        description={id ? `編輯編號${id}` : "新增優惠卷"}
        className="max-w-6xl"
      >
        <CouponForm id={id} />
      </DialogButton>
      {id && (
        <Button
          variant={"destructive"}
          disabled={isPending}
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
