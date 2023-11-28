import FullscreenLoading from "@/components/FullscreenLoading";
import { useGetOrderbyId } from "./get order hook";
import { Separator } from "@/components/ui/separator";
import { PaymentMethod } from "@/pages/front/payment/PaymentMethods";

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
              訂單已成立 {new Date(data.order.create_at).toLocaleString()}
            </h1>
            <div>訂單編號：{data?.order.id}</div>
            <div>訂購人：{data?.order.user.name}</div>
            <div>電子郵件：{data?.order.user.email}</div>
            <div>電話：{data?.order.user.tel}</div>
            <div>地址：{data?.order.user.address}</div>
            <div>備註：{data?.order.message}</div>
            <h1 className="text-xl font-bold">合計:NTD${data.order.total}</h1>
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
