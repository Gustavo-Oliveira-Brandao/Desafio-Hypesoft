import { deleteProduct } from "@/services/productsService";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

type useDeleteProductMutationProps = {
  id: string;
  token: string;
};

export const useDeleteProductMutation = (): UseMutationResult<
  void,
  Error,
  useDeleteProductMutationProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (x) => deleteProduct(x.id, x.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["totalStockValue"] });
      queryClient.invalidateQueries({ queryKey: ["productsCount"] });
      queryClient.invalidateQueries({ queryKey: ["productsCategoryCount"] });
    },
  });
};
