import FullscreenLoading from "@/components/FullscreenLoading";
import { useGetProducts } from "./product hook";
export function ProductsOnSales() {
  const { status, message, products } = useGetProducts();

  if (status === "pending") {
    return <FullscreenLoading />;
  }
  if (status === "error") {
    return <div>{message}</div>;
  }
  return <div>{JSON.stringify(products)}</div>;
}
