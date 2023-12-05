import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { newDataType } from "./ProductForm";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/store";
import { setimgsUrl } from "@/slice/productsSlice";
interface updateDataType extends newDataType {
  id?: string;
}
export function useUpdateAdminProduct() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: updateDataType) => {
      if (!id) {
        return api.products.addProduct({ data });
      } else {
        return api.products.updateProduct({ data, id });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fail",
        description: error.message,
      });
    },
    onSuccess: (data) => {
      dispatch(setimgsUrl([]));
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
