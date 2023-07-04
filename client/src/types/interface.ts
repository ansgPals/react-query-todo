export interface ILoginData {
  message: string
  token: string
}
export interface ILoginFormValues {
  email?: string
  password?: string
}
export interface ITodoItemData {
  title: string
  content: string
  id: string
  createdAt: Date
  updatedAt: Date
}
export interface ICreateFormValues {
  title: string
  content: string
}
