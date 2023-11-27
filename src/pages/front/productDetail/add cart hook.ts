import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export function useAddCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      data: {
        product_id: string;
        qty: number;
      };
    }) => {
      return api.cart.postCart(data);
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
        title: data.message,
        description: `${data.data.product.title} added to cart`,
      });
    },
  });
}
