import { useGetCart } from "../cart/list hook";
// import FullscreenLoading from "@/components/FullscreenLoading";
import { Separator } from "@/components/ui/separator";
import { CheckOrderForm } from "./CheckOrderForm";


export function CheckOrder() {
  const { status, cart, total, final_total, message } = useGetCart();

  return (
    <div className="grid grid-cols-2 p-4">
      <div>
        <CheckOrderForm></CheckOrderForm>
      </div>
      <div>
        {status === "fetching" && <div>Loading...</div>}
        {status === "error" && <div>{message}</div>}
        {status === "success" && (
          <>
            {cart.map((item) => (
              <div key={item.id} className="rouned-md border-2 p-3 my-4">
                <h1 className="my-4 font-bold ">{item.product.title}</h1>
                <div className="flex flex-row items-end justify-around">
                  <img
                    src={item.product.imageUrl}
                    alt=""
                    className="object-cover"
                    style={{
                      width: "150px",
                    }}
                  />
                  <div className="text-start space-x-2">
                    <small>{`${item.product.price}元 x${item.qty}${item.product.unit}`}</small>
                    <Separator className="my-4"></Separator>
                    <p>{`合計  : NTD$ ${item.final_total}`}</p>
                  </div>
                </div>
              </div>
            ))}
            <h1 className="text-lg text-end opacity-60">合計:NTD ${total}</h1>
            <h1 className="text-2xl text-end">折扣後合計:NTD ${final_total}</h1>
          </>
        )}
      </div>
    </div>
  );
}
