import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => {
      return api.order_admin.deleteAdminOrder(id);
    },
    onMutate(variables) {
      return { variables };
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "刪除失敗",
        description: error?.message,
      });
    },
    onSuccess(data, variables) {
      toast({
        variant: "default",
        title: `訂單:${variables}刪除成功`,
        description: data?.message,
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["getOrderData", { type: "admin" }],
      });
    },
  });
}
