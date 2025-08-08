"use client";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { ProductsTable } from "@/components/layout/products-table";
import { SearchBar } from "@/components/layout/search-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllCategoriesQuery } from "@/hooks/queries/categories/useGetAllCategoriesQuery";
import { useGetAllProductsQuery } from "@/hooks/queries/products/useGetAllProductsQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";

const ProdutosPage = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const {
    data: paginatedProductsResponse,
    isLoading,
    isError,
  } = useGetAllProductsQuery(
    {
      pageIndex: currentPage,
      pageSize: 10,
      lowStock: false,
      searchTerm: searchedProduct,
      categoryId: selectedCategory,
    },
    session?.accessToken
    );

    const {
      data: categories,
      isLoading: isCategoriesLoading,
      isError: isCategoriesError,
    } = useGetAllCategoriesQuery(session?.accessToken);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [searchedProduct, selectedCategory, queryClient]);

  const handleSearch = (newTerm: string) => {
    setSearchedProduct(newTerm);
    setCurrentPage(1);
  };

  if (status === "loading" || isLoading || isCategoriesLoading) {
    return (
      <div className="w-full p-10 text-center">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (isError || isCategoriesError) {
    return (
      <div className="w-full p-10 text-center text-red-500">
        <p>Ocorreu um erro ao buscar os produtos.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-10">
      <Card className="bg-zinc-900 w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl">Produtos</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <SearchBar onSearch={handleSearch} />
            <Select
              onValueChange={(value) => {
                setSelectedCategory(value === "all" ? null : value);
                setCurrentPage(1);
              }}
              value={selectedCategory ?? "all"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CreateProductForm />
          </div>
        </CardHeader>

        <CardContent>
          <ProductsTable
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={paginatedProductsResponse?.totalPages ?? 1}
            products={paginatedProductsResponse?.products ?? []}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProdutosPage;
