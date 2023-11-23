import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export function useDeleteCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.cart.deleteItem(id);
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
        title: "刪除成功",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["cart", { type: "all" }] });
    },
  });
}
