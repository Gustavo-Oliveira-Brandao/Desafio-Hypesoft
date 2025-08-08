import { getAllProducts } from "@/services/productsService";
import { IPaginatedProductsResponse, IProduct, IProductQueryParams } from "@/types/product";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetAllProductsQuery = (
  params: IProductQueryParams,
  token: string | undefined
): UseQueryResult<IPaginatedProductsResponse> => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(params, token!),
    enabled: !!token,
  });
};