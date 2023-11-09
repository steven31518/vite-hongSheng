import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuShoppingCart } from "react-icons/lu";
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

const CartSlider = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          <LuShoppingCart className="text-2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart Detail</SheetTitle>
          <SheetDescription>
            Make changes to your cart here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="qty" className="text-center">
            數量
          </Label>
          <div className="flex flex-row items-center gap-4">
            <Button variant={"outline"}>-</Button>
            <Input id="qty" value="Pedro Duarte" className="col-span-3" />
            <Button variant={"outline"}>+</Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSlider;
