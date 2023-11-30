import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { sendEmail } from "@/lib/email";

export function usePay() {
  const queryClient = useQueryClient();
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables] });
      sendEmail({
        from_name: "Hong Sheng E-management",
        from_mail: "",
        to_name: "Manager",
        to_mail: "james31518@gmail.com",
        message: `訂單號碼:${variables}${data.message}`,
      });
    },
  });
}
