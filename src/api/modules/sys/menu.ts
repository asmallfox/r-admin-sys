import { defHttp } from '@/utils/http/axios'

enum Api {
  MenuList = 'getMenuList'
}

export function getMenuListApi(params?: any) {
  return defHttp.get({
    url: Api.MenuList,
    params
  })
}
