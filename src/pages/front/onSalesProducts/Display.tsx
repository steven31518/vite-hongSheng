import { useGetProducts } from "./product hook";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Section from "@/components/Section";

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
    offset: ["start 80%", "start 20%"],
  });

  const variableY = useTransform(scroll.scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
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
          <div className="grid grid-cols-4 gap-4">
            {DataArray.map((product) => {
              return (
                <motion.div key={product.id} style={{ opacity: variableY }}>
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductArtWork
                      product={product}
                      aspectRatio="portrait"
                      width={75}
                      height={75}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
