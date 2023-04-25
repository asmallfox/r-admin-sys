import { defHttp } from '@/utils/http/axios'

enum Api {
  Login = '/login',
  UserList = '/user-list',
  DeleteUserById = 'delete-user-by-id'
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

export function getUserList(params?: any) {
  return defHttp.get({
    url: Api.UserList,
    params
  })
}

export function deleteUserById(params: { id: string | number }) {
  return defHttp.delete({
    url: Api.DeleteUserById,
    data: params
  })
}
