export interface IUser {
  uuid:string
  email:string
  password:string
  name:string
  avatar:string
  role:string
}
export interface IUserCreateDto{
  email:string,
  password:string,
  name:string
  avatar?:File | null
  role:string,
}
export interface IUserUpdateDto{
  uuid?:string,
  email?:string,
  name?:string
  avatar?:File | null
  role?:string,
}
export interface IUserListFilter{
  role?: 'admin' | 'user'
}