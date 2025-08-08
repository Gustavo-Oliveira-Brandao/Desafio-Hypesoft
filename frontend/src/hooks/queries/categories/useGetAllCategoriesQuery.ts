import { getAllCategories } from "@/services/categoryService";
import { ICategory } from "@/types/category";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetAllCategoriesQuery = (token: string | undefined): UseQueryResult<ICategory[]> => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(token!),
    enabled: !!token
  })
}