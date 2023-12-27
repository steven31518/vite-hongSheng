import FullscreenLoading from "@/components/FullscreenLoading";
import { useGetProductDetail } from "./product detail hook";
import { useAddCart } from "./add cart hook";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuPlus, LuMinus } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import ReactLoading from "react-loading";
import { ProductArtWork } from "@/components/ProductArtWork";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BsCartPlus } from "react-icons/bs";
export function ProductDetail() {
  const [qty, setQty] = useState(1);
  const { status, message, product } = useGetProductDetail();
  const { mutate: addCart, isPending } = useAddCart();

  if (status === "pending") {
    return <FullscreenLoading />;
  }
  if (status === "error") {
    return <div className="min-h-screen m-auto">{message}</div>;
  }
  return (
    <div className="container mt-3">
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-12 lg:col-span-6 p-2">
          <div className="w-[550px]">
            <ProductArtWork
              product={product}
              className="w-full"
              aspectRatio="portrait"
              showText={false}
              width={150}
              height={150}
            />
          </div>
          {/* <div className="grid grid-cols-4 gap-4">
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
          </div> */}
        </div>
        <div className="col-span-12 lg:col-span-6 px-4 flex flex-col justify-end items-start space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>{product.description}</p>
          <p className="font-bold">
            NTD${product.price}/{product.unit}
          </p>

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
            className="w-full text-primary-foreground p-3"
            disabled={isPending}
            onClick={() => {
              addCart({ data: { product_id: product.id, qty: qty } });
            }}
          >
            <BsCartPlus className="me-2 text-xl" />
            加入購物車
            {isPending && (
              <ReactLoading type="spin" color="block" height={20} width={20} />
            )}
          </Button>
        </div>
      </div>
      <div className="my-4">
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
