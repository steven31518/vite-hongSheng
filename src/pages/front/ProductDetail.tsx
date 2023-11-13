import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
import { getProductWithId } from "@/slice/productDetailSlice";
import FullscreenLoading from "@/components/FullscreenLoading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuPlus, LuMinus } from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [qty, setQty] = useState(1);
  const { product, loading } = useAppSelector(
    (state) => state.productDetailData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getProductWithId(id));
  }, [dispatch, id]);

  return (
    <div className="container mt-3">
      {loading && <FullscreenLoading />}
      <div className="w-[450px]">
        <AspectRatio ratio={16 / 9}>
          <img
            src={product.imageUrl}
            alt="Image"
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-row justify-around mt-4 mb-7">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="mb-0">{product.title}</h1>
            <p>{product.description}</p>
            <p className="font-bold">NT$ {product.price}</p>
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
          <div className="col-span-12 lg:col-span-3">
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
              <Button type="button" variant={"default"}>
                加入
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
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
};

export default ProductDetail;
