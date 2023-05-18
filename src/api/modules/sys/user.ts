import { defHttp } from '@/utils/http/axios'

enum Api {
  Login = '/login',
  UserInfo = '/userinfo',
  UserList = '/user-list',
  DeleteUserById = '/delete-user-by-id',
  AddUser = '/add-user',
  UpdateUser = `/update-user-by-id/{id}`,
  // 普通用户
  OrdinaryUserList = '/ordinary-user-list',
}

export interface LoginParams {
  username: string
  password: string
}

export function userInfoApi(params?: any) {
  return defHttp.get({
    url: Api.UserInfo,
    params
  })
}

export function loginApi(data: LoginParams) {
  return defHttp.post({
    url: Api.Login,
    data
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

export function getOridnaryUserApi(params?: any) {
  return defHttp.get({
    url: Api.OrdinaryUserList,
    params
  })
}
