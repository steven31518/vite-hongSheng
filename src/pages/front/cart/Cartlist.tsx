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
import { ProductArtWork } from "@/components/ProductArtWork";
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
  async function handleSubmit({ form }: { form: "submit" | "cancel" }) {
    const arr = handleCartDifferent();
    if (arr.length > 0) {
      editCart(arr, {
        onSettled: () => form === "submit" && navigate("/check"),
      });
    } else {
      form === "submit" && navigate("/check");
    }
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
          handleSubmit({ form: "cancel" });
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
          {CartData.length > 0 ? CartData.length : 0}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
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
                  <div className="grid grid-cols-2 gap-4">
                    <ProductArtWork
                      product={item.product}
                      className="w-full"
                      aspectRatio="square"
                      width={150}
                      height={150}
                    />
                    <div className="flex flex-col items-end justify-center space-x-2">
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
                await handleSubmit({ form: "submit" });
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
