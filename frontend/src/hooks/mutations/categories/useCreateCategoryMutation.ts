import { createCategory } from "@/services/categoryService"
import { ICreateCategoryCommand } from "@/types/category"
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"

type useCreateCategoryMutationProps = {
  category: ICreateCategoryCommand
  token: string
}

export const useCreateCategoryMutation = (): UseMutationResult<void, Error, useCreateCategoryMutationProps, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (x) => createCategory(x.category, x.token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories']})
  })
}