import { Button } from "@/components/ui/button";
import { useGetOrderData } from "../admin order/get admin order hook";
import { useDeleteOrder } from "../admin order/delete admin order hook";
import { Link } from "react-router-dom";
import { DialogButton } from "@/components/Dialog";
export function OrderEditor({ id }: { id: string }) {
  const { data, isError, isPending, isSuccess, error } = useGetOrderData(
    (data) => data.orders.filter((order) => order.id === id)
  );
  const { mutate, isPending: deleteIsPending } = useDeleteOrder();
  return (
    <div className="flex flex-row justify-center  items-center gap-2">
      <DialogButton
        title={`訂單編輯`}
        description={`訂單:${id}`}
        name="編輯"
        className="max-w-3xl"
      >
        {isError ? error?.message : ""}
        {isPending && <div>loading...</div>}
        {isSuccess && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <p>訂單編號:{data[0].id}</p>
              <p>訂購日期:{data[0].create_at}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>訂購人:{data[0].user.name}</p>
              <p>訂購人電話:{data[0].user.tel}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>訂購人信箱:{data[0].user.email}</p>
              <p>訂購人地址:{data[0].user.address}</p>
            </div>
            <p>備註:{data[0].message}</p>
            <p>訂單狀態:{data[0].is_paid ? "已付款" : "未付款"}</p>
            <div>
              訂單商品:
              <div>
                {Object.entries(data[0].products).map(([, value], index) => {
                  return (
                    <div key={index}>
                      <Link to={`/product/${value.product_id}`} target="_blank">
                        <Button
                          variant={"link"}
                          className={"text-blue-500"}
                        >{`商品編號:${value.product_id}`}</Button>
                      </Link>
                      <small>商品數量:{value.qty}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </DialogButton>
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
  );
}
