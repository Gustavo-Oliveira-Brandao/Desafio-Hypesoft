import { deleteCategory } from "@/services/categoryService"
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"

type useDeleteCategoryMutationProps = {
  id: string
  token: string
}

export const useDeleteCategoryMutation = (): UseMutationResult<void, Error, useDeleteCategoryMutationProps, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (x) => deleteCategory(x.id, x.token),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["categories"]
    })
  })
}