export type ICategory = {
  id: string
  name: string
}
export type ICreateCategoryCommand = {
  name: string
}

export type IUpdateCategoryCommand = {
  id: string
  name: string;
};