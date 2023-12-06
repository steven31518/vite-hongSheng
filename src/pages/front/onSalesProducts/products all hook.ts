import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";


export function useGetProductsAll() {
  return useQuery({
    queryKey: ["productsAll"],
    queryFn: async () => await api.onSales.getAllProductsClient(),
  });
}
