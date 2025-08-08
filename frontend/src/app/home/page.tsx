"use client";
import { ProductsByCategoryChart } from "@/components/charts/productsByCategoryChart";
import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { UpdateCategoryForm } from "@/components/forms/update-category-form";
import { ProductsTable } from "@/components/layout/products-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCategoriesQuery } from "@/hooks/queries/categories/useGetAllCategoriesQuery";
import { useGetAllProductsQuery } from "@/hooks/queries/products/useGetAllProductsQuery";
import { useGetProductsCountQuery } from "@/hooks/queries/products/useGetProductsCountQuery";
import { useGetTotalStockValueQuery } from "@/hooks/queries/products/useGetTotalStockValueQuery";
import { useSession } from "next-auth/react";
import { ReactElement, useState } from "react";

const HomePage = (): ReactElement => {
  const { data: session, status } = useSession();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: totalStockValue,
    isLoading: isTotalStockLoading,
    isError: isTotalStockError,
  } = useGetTotalStockValueQuery(session?.accessToken);

  const {
    data: productsCount,
    isLoading: isProductsCountLoading,
    isError: isProductsCountError,
  } = useGetProductsCountQuery(session?.accessToken);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoriesQuery(session?.accessToken);

  const {
    data: paginatedProductsLowStockResponse,
    isLoading: isLowStockLoading,
    isError: isLowStockError,
  } = useGetAllProductsQuery(
    {
      pageIndex: 1,
      pageSize: 10,
      lowStock: true,
      searchTerm: "",
      categoryId: null,
    },
    session?.accessToken
  );

  if (
    status === "loading" ||
    isTotalStockLoading ||
    isLowStockLoading ||
    isProductsCountLoading || isCategoriesLoading
  ) {
    return (
      <div className="p-4 md:p-10 w-full text-center">
        Carregando painel de controle...
      </div>
    );
  }

  if (isTotalStockError) {
    return (
      <div className="p-4 md:p-10 w-full text-center text-red-500">
        Erro ao carregar o valor total do estoque.
      </div>
    );
  }

  if (isLowStockError) {
    return (
      <div className="p-4 md:p-10 w-full text-center text-red-500">
        Erro ao carregar a lista de produtos em estoque baixo.
      </div>
    );
  }

  if (isProductsCountError) {
    return (
      <div className="p-4 md:p-10 w-full text-center text-red-500">
        Erro ao carregar quantidade de produtos.
      </div>
    );
  }

    if (isCategoriesError) {
      return (
        <div className="p-4 md:p-10 w-full text-center text-red-500">
          Erro ao carregar categorias.
        </div>
      );
    }

  return (
    <div className="p-4 md:p-10 w-full flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <Card className="bg-zinc-900 w-full sm:w-[230px]">
          <CardHeader>
            <CardTitle>Total de produtos</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl">{String(productsCount) ?? "0"}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 w-full sm:w-[230px]">
          <CardHeader>
            <CardTitle>Valor total do estoque</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl">R$ {String(totalStockValue) ?? "0"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full h-fit">
        <Card className="bg-zinc-900 w-full ">
          <CardHeader>
            <CardTitle>Produtos por categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsByCategoryChart />
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-fit">
        <Card className="bg-zinc-900 w-full">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl">Categorias</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <CreateCategoryForm />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Editar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories != null && categories.length > 0 ? (
                    categories?.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                          <UpdateCategoryForm category={category} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Nenhuma categoria encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full h-fit">
        <Card className="bg-zinc-900 w-full">
          <CardHeader>
            <CardTitle>Produtos em estoque baixo</CardTitle>
          </CardHeader>

          <CardContent>
            <ProductsTable
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={paginatedProductsLowStockResponse?.totalPages ?? 1}
              products={paginatedProductsLowStockResponse?.products ?? []}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
