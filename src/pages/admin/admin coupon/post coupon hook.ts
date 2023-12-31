import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { coupon_post_req } from "@/lib/api/coupon admin";
import { useToast } from "@/components/ui/use-toast";

interface updateDataType extends coupon_post_req {
  id?: string;
}

export function useUpdateCoupon() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: updateDataType) => {
      if (!id) {
        return api.coupon_admin.couponPost({ data });
      } else {
        return api.coupon_admin.couponPut({ data }, id);
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
      toast({
        variant: "default",
        title: "成功",
        description: data.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCouponData", { type: "admin" }],
      });
    },
  });
}
