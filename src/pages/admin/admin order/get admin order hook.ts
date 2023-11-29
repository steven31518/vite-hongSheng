import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useGetOrderData() {
  return useQuery({
    queryKey: ["getOrderData", { type: "admin" }],
    queryFn: () => api.order_admin.getAdminOrder(),
  });
}
