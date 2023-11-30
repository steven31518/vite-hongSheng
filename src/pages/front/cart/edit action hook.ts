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
    onMutate: async (newCart) => {
      console.log("mutate");
      await queryClient.cancelQueries({ queryKey: ["cart", { type: "all" }] });
      await queryClient.setQueryData(
        ["cart", { type: "all" }],
        (oldData: getCart_res) => {
          return {
            ...oldData,
            data: { ...oldData.data, carts: [...newCart] },
          };
        }
      );
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail",
        description: error.message,
      });
    },
    onSuccess: (data) => {
      console.log("success");
      toast({
        variant: "default",
        title: "修改成功",
        description: data.map((item) => item.message).join("、"),
      });
    },
    onSettled: () => {
      console.log("settled");
      queryClient.invalidateQueries({ queryKey: ["cart", { type: "all" }] });
    },
  });
}
