import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { sendEmail } from "@/lib/email";
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
      sendEmail({
        from_name: "Steven",
        from_mail: "james31518@hotmail.com",
        to_name: "unknown",
        to_mail: "james31518@gmail.com",
        message: "you have a new order",
      });
    },
  });
}
