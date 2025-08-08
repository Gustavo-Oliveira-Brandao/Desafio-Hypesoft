import { getProductsByCategoryCount } from "@/services/productsService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProductsByCategoryCountQuery = (token: string | undefined): UseQueryResult<Record<string, number>> => {
  return useQuery({
    queryKey: ["productsCategoryCount"],
    queryFn: () => getProductsByCategoryCount(token!),
    enabled: !!token,
  });
}