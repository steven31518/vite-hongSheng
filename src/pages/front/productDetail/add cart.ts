import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { queryStatus } from "@/types";
import { cart_res } from "@/lib/api/cart/addCart";

interface addCartReturn extends queryStatus {
  data: cart_res;
}
export function useAddCart(): addCartReturn {
  const addCartMutation = useMutation({
    mutationFn: (data: {
      data: {
        product_id: string;
        qty: number;
      };
    }) => {
      return api.cart.postCart(data);
    },
  });
  const { data, isError, isPending, isSuccess } = addCartMutation;
  if (isError) {
    return {
      status: "error",
      message: addCartMutation.error?.message,
      data: {} as cart_res,
    };
  }
  if (isPending) {
    return {
      status: "pending",
      data: {} as cart_res,
    };
  }
  if (isSuccess) {
    return {
      status: "success",
      message: data["message"],
      data: data as cart_res,
    };
  }
  return {
    status: "idle",
    data: {} as cart_res,
  };
}
