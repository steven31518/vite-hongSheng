import { useGetProducts } from "./product hook";
import Section from "@/components/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductArtWork } from "@/components/ProductArtWork";

type props = {
  category: string;
};

export function Display({ category }: props) {
  const { status, message, products } = useGetProducts((data) => data);
  const Array = products["products"].filter(
    (product) => product.category === category
  );
  return (
    <Section title={category}>
      <div className="container">
        {status === "pending" && <div>loading</div>}
        {status === "error" && <div>{message}</div>}
        {status === "success" && (
          <Carousel>
            <CarouselContent>
              {Array.map((product) => {
                return (
                  <CarouselItem key={product.id} className="xs:basis-1/2 md:basis-1/4">
                    <ProductArtWork
                      product={product}
                      aspectRatio="portrait"
                      width={75}
                      height={75}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </Section>
  );
}
