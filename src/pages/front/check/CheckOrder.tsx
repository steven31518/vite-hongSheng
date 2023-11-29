import { useGetCart } from "../cart/list hook";
import FullscreenLoading from "@/components/FullscreenLoading";
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
        {status === "fetching" && <div>loading</div>}
        {status === "error" && <div>{message}</div>}
        {status === "success" && (
          <>
            <h1>合計: {total}</h1>
            <h1>折扣後合計: {final_total}</h1>
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
                    <small>{`${item.product.price}元 x${item.qty}`}</small>
                    <Separator className="my-4"></Separator>
                    <p>{`合計  : NTD$ ${item.final_total}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
