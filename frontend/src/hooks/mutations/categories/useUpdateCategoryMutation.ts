import { updateCategory } from "@/services/categoryService";
import { IUpdateCategoryCommand } from "@/types/category";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

type useUpdateCategoryMutationProps = {
  category: IUpdateCategoryCommand;
  token: string;
};

export const useUpdateCategoryMutation = (): UseMutationResult<
  void,
  Error,
  useUpdateCategoryMutationProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (x) => updateCategory(x.category, x.token),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
};
