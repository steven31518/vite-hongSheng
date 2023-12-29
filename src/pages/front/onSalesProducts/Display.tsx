import { useGetProducts } from "./product hook";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Section from "@/components/Section";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductArtWork } from "@/components/ProductArtWork";
import { Link } from "react-router-dom";

type props = {
  category: string;
};

export function Display({ category }: props) {
  const { status, message, products } = useGetProducts((data) => data);
  
  const DataArray = products["products"].filter((product) =>
    product.category.includes(category)
  );
  
  const lineRef = useRef(null);

  const scroll = useScroll({
    target: lineRef,
    offset: ["start 70%", "start 20%"],
  });

  const variableY = useTransform(scroll.scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <motion.div className="" ref={lineRef} style={{ opacity: variableY }}>
        <Section title={category}>
          {status === "error" && <div>{message}</div>}
          {status === "pending" && (
            <div className="grid grid-cols-4 gap-4">
              {new Array(4).fill(0).map((_, i) => {
                return (
                  <div className="space-y-2" key={i}>
                    <Skeleton className="w-full aspect-[3/4]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                );
              })}
            </div>
          )}
          {status === "success" && (
            <Carousel>
              <CarouselContent>
                {DataArray.map((product) => {
                  return (
                    <CarouselItem
                      key={product.id}
                      className={cn("xs:basis-1/2 md:basis-1/4")}
                    >
                      <Link to={`/product/${product.id}`}>
                        <ProductArtWork
                          product={product}
                          aspectRatio="portrait"
                          width={75}
                          height={75}
                        />
                      </Link>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </Section>
      </motion.div>
    </>
  );
}
