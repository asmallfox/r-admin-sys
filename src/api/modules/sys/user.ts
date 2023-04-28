import { defHttp } from '@/utils/http/axios'

enum Api {
  Login = '/login',
  UserList = '/user-list',
  DeleteUserById = 'delete-user-by-id',
  AddUser = '/add-user',
  UpdateUser = `/update-user-by-id/{id}`
}

export interface LoginParams {
  username: string
  password: string
}

export function loginApi(params: LoginParams) {
  return defHttp.post({
    url: Api.Login,
    data: params
  })
}

export function getUserListApi(params?: any) {
  return defHttp.get({
    url: Api.UserList,
    params
  })
}

export function deleteUserByIdApi(params: { id: string | number }) {
  return defHttp.delete({
    url: Api.DeleteUserById,
    data: params
  })
}

export function addUserApi(data: any) {
  return defHttp.post({
    url: Api.AddUser,
    data
  })
}

export function updateUserApi(data: any) {
  return defHttp.put({
    url: Api.UpdateUser,
    data
  })
}
