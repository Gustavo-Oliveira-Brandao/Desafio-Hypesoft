import { ICategory, ICreateCategoryCommand, IUpdateCategoryCommand } from "@/types/category";
import axios from "axios";
import { headers } from "next/headers";

const baseURL = "http://localhost:5000/api/Category";

export const getAllCategories = async (token: string): Promise<ICategory[]> => {
  const response = await axios.get(`${baseURL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const createCategory = async (data: ICreateCategoryCommand, token: string): Promise<void> => {
  await axios.post(`${baseURL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateCategory = async (data: IUpdateCategoryCommand, token: string): Promise<void> => {
  await axios.put(`${baseURL}/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const deleteCategory = async (id: string, token: string): Promise<void> => {
  await axios.delete(`${baseURL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}