import { defHttp } from '@/utils/http/axios'

enum Api {
  Login = '/login',
  UserList = '/user-list',
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
