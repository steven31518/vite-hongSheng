import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { check_order_type } from "@/pages/front/check/CheckOrderForm";

export function usePostOrder() {
  return useMutation({
    mutationFn: (data: check_order_type) => {
      return api.order.postOrder(data);
    },
    onMutate(variables) {
      return { variables };
    },
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {
      console.log(data);
    },
  });
}
