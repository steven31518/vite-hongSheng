import FullscreenLoading from "@/components/FullscreenLoading";
import { useGetProductDetail } from "./product detail hook";
import { useAddCart } from "./add cart hook";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { LuPlus, LuMinus } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import ReactLoading from "react-loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductDetail() {
  const [qty, setQty] = useState(1);
  const { status, message, product } = useGetProductDetail();
  const { isError, isPending, error, mutate, isSuccess } = useAddCart();
  const { toast } = useToast();
  
  useEffect(() => {
    toast({ variant: "default", title: "string", description: "string" });
  }, [isSuccess, toast]);

  if (status === "pending") {
    return <FullscreenLoading />;
  }
  if (status === "error") {
    return <div className="min-h-screen m-auto">{message}</div>;
  }

  return (
    <div className="container mt-3">
      <div className="grid grid-cols-12 gap-4 my-5">
        <div className="col-span-6 lg:col-span-8">
          <div className="w-[450px]">
            <AspectRatio ratio={16 / 9}>
              <img
                src={product.imageUrl}
                alt="Image"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product?.imagesUrl?.length > 0 &&
              product.imagesUrl
                .filter((url: string) => url !== product.imageUrl)
                .map((url) => {
                  return (
                    <img
                      src={url}
                      alt=""
                      className="img-fluid mt-4"
                      key={url}
                    />
                  );
                })}
          </div>
        </div>
        <div className="col-span-6 lg:col-span-4 flex flex-col justify-end items-start">
          <h1 className="mb-0">{product.title}</h1>
          <p>{product.description}</p>
          <p className="font-bold">NT$ {product.price}</p>
          <div className="w-full flex items-center justify-center space-x-2 mb-2">
            <Button
              variant={"outline"}
              type="button"
              id="button-addon1"
              onClick={() => {
                setQty((pre) => (pre === 1 ? 1 : pre - 1));
              }}
            >
              <LuMinus />
            </Button>
            <Input
              type="number"
              className="text-center my-auto border-0"
              placeholder={qty.toString()}
              value={qty}
              readOnly
            />
            <Button
              variant={"outline"}
              type="button"
              id="button-addon2"
              onClick={() => {
                setQty((pre) => pre + 1);
              }}
            >
              <LuPlus />
            </Button>
          </div>
          <Button
            type="button"
            variant={"default"}
            className="w-full"
            disabled={isPending}
            onClick={() => {
              mutate({ data: { product_id: product.id, qty } });
            }}
          >
            加入購物車
            {isPending ? (
              <ReactLoading type="spin" color="block" height={20} width={20} />
            ) : null}
          </Button>
          {isError ? <div>An error occurred: {error?.message}</div> : null}
        </div>
      </div>
      <div className="">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>{product.content}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
