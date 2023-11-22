import FullscreenLoading from "@/components/FullscreenLoading";
import { useGetProducts } from "./product hook";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full py-4 px-4">
        {products["products"].map((product) => {
          return (
            <Card className="" key={product.id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="border-0 mb-4 relative h-[250px]">
                    <img
                      src={product.imageUrl}
                      alt="image"
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                  <CardDescription>{product.content}</CardDescription>
                  <span className="mt-3 text-success font-bold">
                    NT${product.price}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to={`/product/${product.id}`}>
                  <Button variant={"outline"}>More Detail</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="w-full flex justify-center items-center space-x-3 m-5">
        <Button
          variant="outline"
          type="submit"
          disabled={current_page === 1}
          onClick={() => {
            setSearchParams({ page: Number(current_page - 1).toString() });
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
              setSearchParams({ page: Number(i + 1).toString() });
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
            setSearchParams({ page: Number(current_page + 1).toString() });
          }}
        >
          <LuChevronRight />
        </Button>
      </div>
    </div>
  );
}
