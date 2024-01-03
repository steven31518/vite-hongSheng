import { useGetCart } from "../cart/list hook";
// import FullscreenLoading from "@/components/FullscreenLoading";
import { Separator } from "@/components/ui/separator";
import { CheckOrderForm } from "./CheckOrderForm";
import { CouponForm } from "./CouponForm";


export default function CheckOrder() {
  const { status, cart, total, final_total, message } = useGetCart();
  console.log(cart);
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <CheckOrderForm></CheckOrderForm>
      </div>
      <div>
        {status === "fetching" && <div>Loading...</div>}
        {status === "error" && <div>{message}</div>}
        {status === "success" && (
          <>
            <CouponForm></CouponForm>
            {cart.map((item) => (
              <div key={item.id} className="rouned-lg border-2 p-3 my-4">
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
                    <small>
                      {`${item.product.price}元 x ${item.qty}${
                        item.product.unit
                      } x ${(item.coupon?.percent as number)}%`}
                    </small>
                    <Separator className="my-4"></Separator>
                    <p>{`合計  : NTD$ ${item.final_total}`}</p>
                    <small className="text-primary">
                      已套用優惠卷:{item.coupon?.title}
                    </small>
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
