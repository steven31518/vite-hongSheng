import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
export function useDeleteAdminProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: string) => {
      return api.products.deleteProduct(id);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail",
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "成功",
        description: data.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-products", { type: "getAll" }],
      });
    },
  });
}

