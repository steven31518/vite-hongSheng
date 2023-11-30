import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { check_order_type } from "@/pages/front/check/CheckOrderForm";
import { useNavigate } from "react-router-dom";

export function usePostOrder() {
  const navigate = useNavigate();
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
      navigate(`/success/${data.orderId}`);
    },
  });
}
