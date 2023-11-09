import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
import { useParams } from "react-router-dom";
import { getProductsInPage } from "@/slice/onSalesSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FullscreenLoading from "@/components/FullscreenLoading";
import Pagination from "@/components/Pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

const Products = () => {
  const { products, loading } = useAppSelector((state) => state.onSalesData);
  const dispatch = useAppDispatch();
  const { category } = useParams<{ category: string }>();
  useEffect(() => {
    if (!category) {
      dispatch(getProductsInPage({ page: "1", category: "" }));
    } else {
      dispatch(getProductsInPage({ page: "1", category: category }));
    }
  }, [category, dispatch]);

  return (
    <>
      {loading && <FullscreenLoading />}
      <div className="w-full"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full py-4 px-4">
        {products.map((product) => {
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
      <Pagination></Pagination>
    </>
  );
};

export default Products;
