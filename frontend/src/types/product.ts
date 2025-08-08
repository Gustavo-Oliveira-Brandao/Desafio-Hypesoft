export type IProduct = {
  id: string
  name: string
  description: string
  price: number
  stockQuantity: number
  categoryId?: string
}

export interface IPaginatedProductsResponse {
  products: IProduct[];
  totalPages: number;
}

export type IProductQueryParams = {
  pageIndex?: number;
  pageSize?: number;
  lowStock: boolean;
  searchTerm: string | null;
  categoryId: string | null;
};

export type ICreateProductCommand = {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId?: string | null;
};

export type IUpdateProductCommand = {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId?: string | null;
};