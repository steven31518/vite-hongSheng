import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { get_order_res } from "@/lib/api/order/getOrder";

export function useGetOrderData<T = get_order_res>(
  selectFn: (pramas: get_order_res) => T
) {
  return useQuery({
    queryKey: ["getOrderData", { type: "admin" }],
    queryFn: () => api.order_admin.getAdminOrder(),
    select: (data) => selectFn(data),
  });
}
