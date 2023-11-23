import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { queryStatus } from "@/types";
import { cart_res } from "@/lib/api/cart/addCart";

interface addCartReturn extends queryStatus {
  carts: cart_res | null;
}
export function useAddCart() {
  const { toast } = useToast();
  const addCartMutation = useMutation({
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
      toast({
        variant: "default",
        title: data.message,
        description: data.data.qty,
      });
    },
  });
  const { data, isPending, isError, isSuccess, error } = addCartMutation;
  function addCart(data: { data: { product_id: string; qty: number } }) {
    addCartMutation.mutate(data);
  }
  return {
    addCart,
    data,
    isPending,
    isError,
    isSuccess,
    error,
  };
}
