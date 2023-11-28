import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams } from "react-router-dom";

export function useGetOrderbyId() {
  const { id } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => api.order.getOrderbyId(id as string),
    enabled: !!id,
  });
}
