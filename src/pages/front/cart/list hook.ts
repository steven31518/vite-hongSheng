import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { getCart_res } from "@/lib/api/cart/getCart";
import type { queryStatus } from "@/types";

interface cartReturn extends queryStatus {
  cart: getCart_res["data"]["carts"];
  total: getCart_res["data"]["total"];
  final_total: getCart_res["data"]["final_total"];
}

export function useGetCart(): cartReturn {
  const cartQuery = useQuery({
    queryKey: ["cart", { type: "all" }],
    queryFn: async () => await api.cart.getCart(),
  });
  const { isError, isPending, isSuccess, data, dataUpdatedAt, isFetching } =
    cartQuery;

  if (isError) {
    return {
      status: "error",
      message: cartQuery.error?.message,
      cart: [],
      total: 0,
      final_total: 0,
    };
  }
  if (isPending) {
    return {
      status: "pending",
      cart: [],
      total: 0,
      final_total: 0,
    };
  }
  if (isFetching) {
    return {
      status: "fetching",
      cart: [],
      total: 0,
      final_total: 0,
    };
  }
  if (isSuccess) {
    return {
      status: "success",
      message: new Date(dataUpdatedAt).toLocaleDateString(),
      cart: data["data"]["carts"],
      total: data["data"]["total"],
      final_total: data["data"]["final_total"],
    };
  }
  return {
    status: "success",
    message: new Date(dataUpdatedAt).toLocaleDateString(),
    cart: data["data"]["carts"],
    total: data["data"]["total"],
    final_total: data["data"]["final_total"],
  };
}
