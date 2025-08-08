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
import { useCreateCategoryMutation } from "@/hooks/mutations/categories/useCreateCategoryMutation"; // 👈 Hook para a mutação

const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(50, "O nome não pode ter mais de 50 caracteres."),
});

export const CreateCategoryForm = (): ReactElement => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const createCategoryMutation = useCreateCategoryMutation();

  const onSubmit = (data: z.infer<typeof createCategorySchema>) => {
    if (session != null) {
      createCategoryMutation.mutate(
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
        <Button className="bg-green-400">Adicionar categoria</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar categoria</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova categoria.
          </DialogDescription>
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
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={createCategoryMutation.isPending}>
              {createCategoryMutation.isPending
                ? "Salvando..."
                : "Salvar categoria"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
