import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { get_coupon_res } from "@/lib/api/coupon admin";

export function useGetCouponData<T = get_coupon_res>(
  selectFn: (pramas: get_coupon_res) => T
) {
  return useQuery({
    queryKey: ["getCouponData", { type: "admin" }],
    queryFn: () => api.coupon_admin.couponGet(),
    select: (data) => selectFn(data),
  });
}

