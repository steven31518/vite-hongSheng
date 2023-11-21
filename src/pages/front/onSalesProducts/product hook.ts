import { api } from "@/lib/api";
import { newDataType } from "@/components/ProductForm";
import { useQuery } from "@tanstack/react-query";
import { queryStatus } from "@/types";
// 使用typeof運算符來獲取id物件的型別

// 使用productType作為陣列的元素型別
interface productType extends newDataType {
  id: string;
}
interface productReturn extends queryStatus {
  products: productType[];
}

export function useGetProducts(): productReturn {
  const productsQuery = useQuery({
    queryKey: ["products", { type: "all" }],
    queryFn: async () => await api.onSales.getProductsInPage("1", ""),
  });

  console.log(productsQuery);
  const { isError, isPending, data, dataUpdatedAt } = productsQuery;
  if (isError) {
    return {
      status: "error",
      message: productsQuery.error?.message,
      products: [],
    };
  }
  if (isPending) {
    return {
      status: "pending",
      products: [],
    };
  }
  if (data) {
    return {
      status: "success",
      message: new Date(dataUpdatedAt).toLocaleDateString(),
      products: data.products,
    };
  }
  return {
    status: productsQuery["data"]["success"] ? "success" : "error",
    message: new Date(productsQuery["dataUpdatedAt"]).toLocaleTimeString(),
    products: productsQuery["data"]["products"],
  };
}
