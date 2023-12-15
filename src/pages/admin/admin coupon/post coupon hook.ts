import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { coupon_post_req } from "@/lib/api/coupon admin";
import { useToast } from "@/components/ui/use-toast";

export function useUpdateCoupon() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: coupon_post_req) => {
      return api.coupon_admin.couponPost(data);
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
  });
}
