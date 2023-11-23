import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

// import { queryStatus } from "@/types";
// import { cart_res } from "@/lib/api/cart/addCart";

// interface addCartReturn extends queryStatus {
//   data: cart_res;
// }
export function useAddCart() {
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
  const { isError, isPending, isSuccess, data, error, mutate } =
    addCartMutation;

  return {
    isError,
    isPending,
    isSuccess,
    data,
    error,
    mutate,
  };
}
