import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetCart } from "./list hook";
import { useDeleteCart } from "./delete action hook";
import { useEditCart } from "./edit action hook";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuShoppingCart } from "react-icons/lu";
import ReactLoading from "react-loading";
import { LuPlus, LuMinus } from "react-icons/lu";
import type { getCart_res } from "@/lib/api/cart/getCart";

type CartItem = getCart_res["data"]["carts"];

export default function CartList() {
  const { status, message, cart, total, final_total } = useGetCart();
  const { mutate: deleteCart, isPending: deleteIsPending } = useDeleteCart();
  const { mutate: editCart, isPending: editIsPending } = useEditCart();
  const [CartData, setCartData] = useState<CartItem>([]);
  const navigate = useNavigate();

  function handleCount(id: string, action: () => number) {
    const newCart = [...CartData];
    const index = newCart.findIndex((item) => item.id === id);
    newCart[index].qty = action();
    if (newCart[index].qty < 1) newCart[index].qty = 1;
    newCart[index].final_total =
      newCart[index].qty * newCart[index].product.price;
    setCartData(newCart);
  }
  function handleCartDifferent(): CartItem {
    return CartData.filter((item) => {
      const sameProduct = cart.find((p) => p.id === item.id);
      if (!sameProduct || sameProduct.qty === item.qty) {
        return false;
      } else {
        return true;
      }
    });
    // const arr = CartData.filter((item) => {
    //   return item.id !== cart.find((p) => p.qty === item.qty)?.id;
    // });
  }
  async function handleSubmit() {
    const arr = handleCartDifferent();
    if (arr.length > 0)  editCart(arr);
  }

  useEffect(() => {
    if (status === "success") {
      setCartData(JSON.parse(JSON.stringify(cart)));
    }
  }, [cart, status]);
  return (
    <Sheet
      onOpenChange={async (open) => {
        if (!open) {
          handleSubmit();
        }
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" className="rounded-full relative">
          {editIsPending ? (
            <ReactLoading type="spin" color="white" />
          ) : (
            <LuShoppingCart className="text-2xl" />
          )}
          {cart.length > 0 ? cart.length : 0}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Cart Detail</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          {status === "pending" && <ReactLoading type="spin" color="white" />}
          {status === "error" && <p>{message}</p>}
          {status === "success" && (
            <>
              {[...CartData].map((item) => (
                <div key={item.id} className="rouned-md border-2 p-3 my-4">
                  <h1 className="my-4 font-bold">{item.product.title}</h1>
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
                  <div className="grid gap-4 py-4">
                    <Label htmlFor={item.id} className="text-center">
                      數量
                    </Label>
                    <div className="flex flex-row justify-end items-center">
                      <Button
                        variant={"ghost"}
                        disabled={item.qty === 1}
                        onClick={() => {
                          handleCount(item.id, () => item.qty - 1);
                        }}
                      >
                        <LuMinus />
                      </Button>
                      <Input
                        id={item.id}
                        value={item.qty}
                        className="col-span-3 text-center"
                        min={1}
                        readOnly
                      />
                      <Button
                        variant={"ghost"}
                        onClick={() => {
                          handleCount(item.id, () => item.qty + 1);
                        }}
                      >
                        <LuPlus />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant={"outline"}
                    className="w-full"
                    disabled={deleteIsPending}
                    onClick={() => {
                      deleteCart(item.id);
                    }}
                  >
                    Delete
                    {deleteIsPending ? (
                      <ReactLoading type="spin" color="white" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              ))}
              <div>total: {total}</div>
              <div>final_total: {final_total}</div>
            </>
          )}
        </SheetDescription>
        <SheetFooter>
          {CartData.length > 0 && (
            <Button
              type="submit"
              disabled={editIsPending}
              onClick={async () => {
                await handleSubmit();
                navigate("/check");
              }}
            >
              確認付款
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
