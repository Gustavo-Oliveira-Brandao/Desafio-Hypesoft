import {
  ICreateProductCommand,
  IPaginatedProductsResponse,
  IProduct,
  IProductQueryParams,
  IUpdateProductCommand,
} from "@/types/product";
import axios from "axios";

const baseURL = "http://localhost:5000/api/Product";

export const getTotalStockValue = async (token: string): Promise<number> => {
  const response = await axios.get(`${baseURL}/stockValue`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllProducts = async (
  params: IProductQueryParams,
  token: string
): Promise<IPaginatedProductsResponse> => {
  const {
    pageIndex = 1,
    pageSize = 10,
    lowStock,
    searchTerm = null,
    categoryId = null,
  } = params;

  const response = await axios.get<IPaginatedProductsResponse>(`${baseURL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageIndex,
      pageSize,
      lowStock,
      searchTerm,
      categoryId,
    },
  });

  console.log(response);

  return response.data;
};

export const getProductsByCategoryCount = async (
  token: string
): Promise<Record<string, number>> => {
  const response = await axios.get(`${baseURL}/productsCategoryCount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createProduct = async (
  data: ICreateProductCommand,
  token: string
): Promise<void> => {
  await axios.post(`${baseURL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductsCount = async (token: string): Promise<number> => {
  const response = await axios.get(`${baseURL}/productsCount`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const updateProduct = async (
  data: IUpdateProductCommand,
  token: string
): Promise<void> => {
  await axios.put(`${baseURL}/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (
  id: string,
  token: string
): Promise<void> => {
  await axios.delete(`${baseURL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};