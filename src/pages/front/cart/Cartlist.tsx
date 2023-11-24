import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuShoppingCart } from "react-icons/lu";
import ReactLoading from "react-loading";
import { LuPlus, LuMinus } from "react-icons/lu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetCart } from "./list hook";
import { useDeleteCart } from "./delete action hook";
const CartList = () => {
  const { status, message, cart, total, final_total } = useGetCart();
  const { mutate: deleteCart, isPending } = useDeleteCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="rounded-full relative">
          <LuShoppingCart className="text-2xl" />
          {cart.length > 0 ? cart.length : 0}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart Detail</SheetTitle>
          <SheetDescription>
            {status === "pending" && (
              <ReactLoading type="spin" color="#fffff" />
            )}
            {status === "error" && <p>{message}</p>}
            {status === "success" && (
              <div>
                {cart.map((item) => (
                  <div key={item.id} className="rouned-md border-2 p-3">
                    <div>{item.product.title}</div>
                    <div>{`單價 : ${item.product.price}`}</div>
                    <div>{`合計 : ${item.final_total}`}</div>
                    <div className="grid gap-4 py-4 ">
                      <Label htmlFor={item.id} className="text-center">
                        數量
                      </Label>
                      <div className="flex flex-row justify-end items-center">
                        <Button variant={"ghost"}>
                          <LuMinus />
                        </Button>
                        <Input
                          id={item.id}
                          value={item.qty}
                          className="col-span-3 text-center"
                          readOnly
                        />
                        <Button variant={"ghost"}>
                          <LuPlus />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant={"outline"}
                      className="w-full"
                      disabled={isPending}
                      onClick={() => {
                        deleteCart(item.id);
                      }}
                    >
                      Delete
                      {isPending ? (
                        <ReactLoading type="spin" color="white" />
                      ) : (
                        ""
                      )}
                    </Button>
                  </div>
                ))}
                <div>total: {total}</div>
                <div>final_total: {final_total}</div>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        {/*  */}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartList;
