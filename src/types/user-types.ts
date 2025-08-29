export interface IUser {
  uuid:string
  email:string
  password:string
  name:string
  avatar:string
  role:string
}

export interface IUserListFilter{
  role?: 'admin' | 'user'
}