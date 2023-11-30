import { api } from "@/lib/api";
import { product_res } from "@/lib/api/onSales";
import { useQuery } from "@tanstack/react-query";
import { queryStatus } from "@/types";

import { useParams } from "react-router-dom";

interface productReturn extends queryStatus {
  product: product_res["product"];
}

export function useGetProductDetail(): productReturn {
  const { id } = useParams<{ id: string }>();

  const productDetailQuery = useQuery({
    queryKey: ["productDetail", id],
    queryFn: async () => await api.onSales.getProductWithId(id as string),
    enabled: !!id,
  });
  const { isError, isPending, isSuccess, data, dataUpdatedAt } =
    productDetailQuery;

  if (isError) {
    return {
      status: "error",
      message: productDetailQuery.error?.message,
      product: {} as product_res["product"],
    };
  }
  if (isPending) {
    return {
      status: "pending",
      product: {} as product_res["product"],
    };
  }
  if (isSuccess) {
    return {
      status: "success",
      message: new Date(dataUpdatedAt).toLocaleDateString(),
      product: data["product"] as product_res["product"],
    };
  }
  return {
    status: "success",
    message: new Date(dataUpdatedAt).toLocaleDateString(),
    product: data["product"] as product_res["product"],
  };
}
