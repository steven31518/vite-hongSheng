import FullscreenLoading from "@/components/FullscreenLoading";
import { useGetOrderbyId } from "./get order hook";
import { Separator } from "@/components/ui/separator";
import { PaymentMethod } from "@/pages/front/payment/PaymentMethods";
import { Link } from "react-router-dom";

export function Success() {
  const { data, isError, isPending, isSuccess, error } = useGetOrderbyId();

  return (
    <div className="container p-4">
      {isPending && <FullscreenLoading />}
      {isError && <div>{error?.message}</div>}
      {isSuccess && (
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4 rounded-lg border-2 p-4">
            <h1>
              訂單已成立{" "}
              {new Date(data.order.create_at * 1000).toLocaleString()}
            </h1>
            <p>訂單編號：{data?.order.id}</p>
            <p>訂購人：{data?.order.user.name}</p>
            <p>電子郵件：{data?.order.user.email}</p>
            <p>電話：{data?.order.user.tel}</p>
            <p>地址：{data?.order.user.address}</p>
            <p>備註：{data?.order.message}</p>
            <p className="">付款狀態:{data.order.is_paid ? "已付款" : "未付款"}</p>
            <h1 className="text-xl font-bold">合計:NTD${data.order.total}</h1>
            <Link to="/home">返回賣場</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <PaymentMethod></PaymentMethod>
            </div>
            <div>
              {Object.values(data.order.products).map((item) => {
                return (
                  <div key={item.id} className="rouned-md border-2 p-3 ">
                    <h1 className="my-4 font-bold">{item.product.title}</h1>
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="object-cover"
                        style={{
                          width: "150px",
                        }}
                      />
                      <Separator className="my-4"></Separator>
                      <div className="text-start space-x-2">
                        <small>{`${item.product.price}元 x${item.qty}`}</small>
                        <p>{`合計  : NTD$ ${item.final_total}`}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
