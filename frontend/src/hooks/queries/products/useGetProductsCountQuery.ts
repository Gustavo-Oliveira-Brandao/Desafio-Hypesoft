import { getProductsCount } from "@/services/productsService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProductsCountQuery = (token: string | undefined): UseQueryResult<number> => {
  return useQuery({
    queryKey: ["productsCount"],
    queryFn: () => getProductsCount(token!),
    enabled: !!token
  })
}