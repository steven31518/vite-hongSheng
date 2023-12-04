import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { get_admin_products_res } from "@/lib/api/products";

export function useGetAdminProducts<T = get_admin_products_res>(
  selectFn: (pramas: get_admin_products_res) => T
) {
  return useQuery({
    queryKey: ["admin-products", { type: "getAll" }],
    queryFn: () => api.products.getAllProducts(),
    select: (data) => selectFn(data),
    refetchOnWindowFocus: false,
  });
}
