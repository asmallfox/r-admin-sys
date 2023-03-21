import { defHttp } from '@/utils/http/axios'

enum Api {
  Login = '/login'
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
