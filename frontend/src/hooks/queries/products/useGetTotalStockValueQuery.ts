import { getTotalStockValue } from '@/services/productsService'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useGetTotalStockValueQuery = (token: string | undefined): UseQueryResult<number> => {
  return useQuery({
    queryKey: ["totalStockValue"],
    queryFn: () => getTotalStockValue(token!),
    enabled: !!token,
  });
}