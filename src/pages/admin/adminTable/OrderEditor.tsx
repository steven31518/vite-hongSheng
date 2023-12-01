import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetOrderData } from "../admin order/get admin order hook";
import { useDeleteOrder } from "../admin order/delete admin order hook";
import { Link } from "react-router-dom";

export function OrderEditor({ id }: { id: string }) {
  const { data, isError, isPending, isSuccess, error } = useGetOrderData(
    (data) => data.orders.filter((order) => order.id === id)
  );
  const { mutate, isPending: deleteIsPending } = useDeleteOrder();
  return (
    <Dialog>
      <div className="flex flex-row justify-center  items-center gap-2">
        <DialogTrigger asChild>
          <Button variant={"default"}>編輯</Button>
        </DialogTrigger>
        <Button
          disabled={deleteIsPending}
          variant={"destructive"}
          onClick={() => {
            mutate(id);
          }}
        >
          移除
        </Button>
      </div>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{`訂單:${id}`}</DialogTitle>
          {isPending && <DialogDescription>Loading...</DialogDescription>}
          {isError && <DialogDescription>{error?.message}</DialogDescription>}
        </DialogHeader>
        {isSuccess && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div>訂單編號:{data[0].id}</div>
              <div>訂購日期:{data[0].create_at}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div>訂購人:{data[0].user.name}</div>
              <div>訂購人電話:{data[0].user.tel}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div>訂購人信箱:{data[0].user.email}</div>
              <div>訂購人地址:{data[0].user.address}</div>
            </div>
            <div>備註:{data[0].message}</div>
            <div>訂單狀態:{data[0].is_paid ? "已付款" : "未付款"}</div>
            <div>
              訂單商品:
              <div>
                {Object.entries(data[0].products).map(([, value], index) => {
                  return (
                    <div key={index}>
                      <Link to={`/product/${value.product_id}`} target="_blank">
                        <Button
                          variant={"link"}
                        >{`商品編號:${value.product_id}`}</Button>
                      </Link>
                      <div>商品數量:{value.qty}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
