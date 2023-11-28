import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function usePay() {
  return useMutation({
    mutationFn: (id: string) => {
      return api.pay.pay(id);
    },
    onMutate(variables) {
      return { variables };
    },
    onError(error) {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
