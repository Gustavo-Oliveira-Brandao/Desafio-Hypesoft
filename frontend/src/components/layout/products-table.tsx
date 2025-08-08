import { IProduct } from "@/types/product";
import { ReactElement } from "react";
import { UpdateProductForm } from "../forms/update-product-form";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";
import { useGetAllCategoriesQuery } from "@/hooks/queries/categories/useGetAllCategoriesQuery";
import { useSession } from "next-auth/react";
import { formatCurrency } from "@/utils/currencyFormatter";

type ProductsTableProps = {
  products: IProduct[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const ProductsTable = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}: ProductsTableProps): ReactElement => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const { data: session } = useSession();
  const { data: categories } = useGetAllCategoriesQuery(session?.accessToken);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="hidden md:table-cell">Preço</TableHead>

            <TableHead className="hidden md:table-cell">
              Quantidade no estoque
            </TableHead>
            <TableHead className="hidden md:table-cell">Categoria</TableHead>
            <TableHead>Editar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products != null && products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>

                <TableCell className="hidden md:table-cell">
                  {formatCurrency(product.price)}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {String(product.stockQuantity)}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {categories?.find((c) => c.id === product.categoryId)?.name ??
                    "N/A"}
                </TableCell>

                <TableCell>
                  <UpdateProductForm product={product} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhum produto encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
