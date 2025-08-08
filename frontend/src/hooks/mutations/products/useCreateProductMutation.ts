import { createProduct } from "@/services/productsService";
import { ICreateProductCommand } from "@/types/product";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

type useCreateProductMutationProps = {
  data: ICreateProductCommand;
  token: string;
};

export const useCreateProductMutation = (): UseMutationResult<
  void,
  Error,
  useCreateProductMutationProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (x: useCreateProductMutationProps) =>
      createProduct(x.data, x.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["totalStockValue"] });
      queryClient.invalidateQueries({ queryKey: ["productsCount"] });
      queryClient.invalidateQueries({ queryKey: ["productsCategoryCount"]})
    },
  });
};
