import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { getCart_res } from "@/lib/api/cart/getCart";
type CartItem = getCart_res["data"]["carts"];

export function useEditCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CartItem) => {
      return api.cart.editCart(data);
    },
    onMutate(variables) {
      return { variables };
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "Fail",
        description: error.message,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["cart", { type: "all" }] });
      toast({
        variant: "default",
        title: "修改成功",
        description: data.map((item) => item.message).join("、"),
      });
    },
  });
}
