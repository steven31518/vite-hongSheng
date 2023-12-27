import { api } from "@/lib/api";
import { allProducts_res } from "@/lib/api/onSales";
import { useQuery } from "@tanstack/react-query";
// import { queryStatus } from "@/types";
import { useSearchParams } from "react-router-dom";

// interface productReturn extends queryStatus {
//   products: allProducts_res;
// }

export function useGetProducts<T = allProducts_res>(
  selectFn: (pramas: allProducts_res) => T
) {
  const search = useSearchParams()[0];
  const category = search.get("category")?.toString() || "";
  const page = search.get("page")?.toString() || "";

  const productsQuery = useQuery({
    queryKey: ["products", page, { type: category }],
    queryFn: async () => await api.onSales.getProductsInPage(page, category),
    select: (data) => selectFn(data),
  });
  const { isError, isPending, isSuccess, data, dataUpdatedAt } = productsQuery;

  if (isError) {
    return {
      status: "error",
      message: productsQuery.error?.message,
      products: {
        products: [],
        pagination: {
          category: "",
          current_page: 0,
          has_next: false,
          has_pre: false,
          total_pages: 0,
        },
      },
    };
  }
  if (isPending) {
    return {
      status: "pending",
      products: {
        products: [],
        pagination: {
          category: "",
          current_page: 0,
          has_next: false,
          has_pre: false,
          total_pages: 0,
        },
      },
    };
  }
  if (isSuccess) {
    return {
      status: "success",
      message: new Date(dataUpdatedAt).toLocaleDateString(),
      products: data as allProducts_res,
    };
  }
  return {
    status: productsQuery["data"]["success"] ? "success" : "error",
    message: new Date(productsQuery["dataUpdatedAt"]).toLocaleTimeString(),
    products: productsQuery["data"],
  };
}
