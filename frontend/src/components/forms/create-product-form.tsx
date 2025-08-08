import { ReactElement, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useCreateProductMutation } from "@/hooks/mutations/products/useCreateProductMutation";
import { useSession } from "next-auth/react";
import { useGetAllCategoriesQuery } from "@/hooks/queries/categories/useGetAllCategoriesQuery";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome não pode ter mais de 100 caracteres."),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  price: z.number().min(0.01, "O preço deve ser maior que zero."),
  stockQuantity: z
    .number()
    .int()
    .min(0, "A quantidade em estoque não pode ser negativa."),
  categoryId: z.string().optional().nullable(),
});

export const CreateProductForm = (): ReactElement => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery(session?.accessToken);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stockQuantity: 0,
      categoryId: null,
    },
  });

  const createProductMutation = useCreateProductMutation();

  const onSubmit = (data: z.infer<typeof createProductSchema>) => {
    if (session != null) {
      createProductMutation.mutate(
        { data: data, token: session.accessToken },
        {
          onSuccess: () => {
            setOpen(false);
          },
        }
      );
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="p-4 md:p-10 w-full text-center">
        Carregando formulário...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-10 w-full text-center text-red-500">
        Erro ao carregar categorias.
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-400">Adicionar produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar produto</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo produto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" {...register("description")} />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="stockQuantity">Quantidade em estoque</Label>
              <Input
                id="stockQuantity"
                type="number"
                {...register("stockQuantity", { valueAsNumber: true })}
              />
              {errors.stockQuantity && (
                <p className="text-red-500 text-sm">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryId">Categoria</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={createProductMutation.isPending}>
              {createProductMutation.isPending
                ? "Salvando..."
                : "Salvar produto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
