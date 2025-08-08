import { updateProduct } from "@/services/productsService";
import { IUpdateProductCommand } from "@/types/product";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

type useUpdateProductMutationProps = {
  data: IUpdateProductCommand;
  token: string;
};

export const useUpdateProductMutation = (): UseMutationResult<
  void,
  Error,
  useUpdateProductMutationProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (x: useUpdateProductMutationProps) =>
      updateProduct(x.data, x.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["totalStockValue"] });
      queryClient.invalidateQueries({ queryKey: ["productsCount"] });
      queryClient.invalidateQueries({ queryKey: ["productsCategoryCount"] });
    },
  });
};
