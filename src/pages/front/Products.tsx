import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
import { getProductsInPage } from "@/slice/onSalesSlice";
import { Button } from "@/components/ui/button";
import FullscreenLoading from "@/components/FullscreenLoading";
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

  useEffect(() => {
    dispatch(getProductsInPage({ page: "1", category: "" }));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full py-4 px-4">
      {loading && <FullscreenLoading />}
      {products.map((product) => {
        return (
          <Card className="" key={product.id}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="border-0 mb-4 relative h-[220px]">
                  <img
                    src={product.imageUrl}
                    alt="image"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <p>{product.content}</p>
                  <small className="mt-3">NT${product.price}</small>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant={"outline"}>More Detail</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;
