import { useGetAdminProducts } from "../admin product/get admin products hook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export function ProductEditor({ id }: { id: string }) {
  const { data, error, isPending, isError } = useGetAdminProducts((data) =>
    Object.values(data.products).find((product) => product.id === id)
  );
  return (
    <Dialog>
      <div className="flex flex-row justify-center  items-center gap-2">
        <DialogTrigger asChild>
          <Button variant={"default"}>編輯</Button>
        </DialogTrigger>
        <Button variant={"destructive"}>移除</Button>
      </div>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{`訂單:${id}`}</DialogTitle>
          {isPending && <DialogDescription>Loading...</DialogDescription>}
          {isError && <DialogDescription>{error?.message}</DialogDescription>}
        </DialogHeader>
        <div>{JSON.stringify(data)}</div>
      </DialogContent>
    </Dialog>
  );
}
