import FullscreenLoading from "@/components/FullscreenLoading";
import { useGetProducts } from "./product hook";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProductArtWork } from "@/components/ProductArtWork";

export function ProductsOnSales() {
  const { status, message, products } = useGetProducts();
  const { current_page, total_pages } = products["pagination"];
  const setSearchParams = useSearchParams()[1];
  if (status === "pending") {
    return <FullscreenLoading />;
  }
  if (status === "error") {
    return <div>{message}</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 w-full py-4 px-4">
        {products["products"].map((product) => {
          return (
            <Link
              className="cursor-pointer"
              to={`/product/${product.id}`}
              key={product.id}
            >
              <ProductArtWork
                product={product}
                className="w-full"
                aspectRatio="portrait"
                width={150}
                height={150}
              />
            </Link>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center space-x-3 m-5">
        <Button
          variant="outline"
          type="submit"
          disabled={current_page === 1}
          onClick={() => {
            setSearchParams((pre) => {
              pre.set("page", (current_page - 1).toString());
              return pre;
            });
          }}
        >
          <LuChevronLeft />
        </Button>
        {new Array(total_pages).fill(0).map((_, i) => (
          <Button
            variant={current_page === i + 1 ? "default" : "outline"}
            key={i}
            disabled={current_page === i + 1}
            onClick={() => {
              setSearchParams((pre) => {
                pre.set("page", (i + 1).toString());
                return pre;
              });
            }}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          type="submit"
          disabled={current_page === total_pages}
          onClick={() => {
            setSearchParams((pre) => {
              pre.set("page", (current_page + 1).toString());
              return pre;
            });
          }}
        >
          <LuChevronRight />
        </Button>
      </div>
    </div>
  );
}
