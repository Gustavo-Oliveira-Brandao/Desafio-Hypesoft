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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Edit } from "lucide-react";
import { ICategory } from "@/types/category";
import { useUpdateCategoryMutation } from "@/hooks/mutations/categories/useUpdateCategoryMutation";
import { useDeleteCategoryMutation } from "@/hooks/mutations/categories/useDeleteCategoryMutation";

const updateCategorySchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(50, "O nome não pode ter mais de 50 caracteres."),
});

export const UpdateCategoryForm = ({
  category,
}: {
  category: ICategory;
}): ReactElement => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
    },
  });

  const updateCategoryMutation = useUpdateCategoryMutation();
  const deleteCategoryMutation = useDeleteCategoryMutation();

  const onDelete = (): void => {
    if (session != null) {
      deleteCategoryMutation.mutate({
        id: category.id,
        token: session.accessToken,
      });
      setOpen(false);
    }
  };

  const onSubmit = (data: z.infer<typeof updateCategorySchema>) => {
    if (session != null) {
      updateCategoryMutation.mutate(
        { category: data, token: session.accessToken },
        {
          onSuccess: () => {
            setOpen(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-400">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>Edite os dados da categoria.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome da categoria</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="bg-red-600 text-white"
              type="button"
              onClick={onDelete}
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending
                ? "Deletando..."
                : "Deletar categoria"}
            </Button>
            <Button
              type="submit"
              className="bg-green-400"
              disabled={updateCategoryMutation.isPending}
            >
              {updateCategoryMutation.isPending
                ? "Salvando..."
                : "Salvar categoria"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
