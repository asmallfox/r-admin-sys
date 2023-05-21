import type { MockMethod } from 'vite-plugin-mock'
import { errorResult, RequestParams, successResult, getToken } from '../_util'
import adminMenu from './data/adminMenu.json'
import testMenu from './data/testMenu.json'
import { adminList } from './data/userData'
import { PermissionEnum } from '../../src/enums/menuEnum'

export default [
  {
    url: '/basic-api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: RequestParams) => {
      const token = getToken(request.headers)
      if (token) {
        const userInfo = JSON.parse(token)
        const findUser = adminList.find(
          (user) =>
            user.id === userInfo.id && user.username === userInfo.username
        )
        if (findUser) {
          let menu: Record<string, unknown>[] = []
          console.log(findUser.permissions)
          switch(findUser.permissions) {
            case PermissionEnum.ADMIN:
              menu = adminMenu
              break
            case PermissionEnum.TEST:
              menu = testMenu
              break
          }
          return successResult(menu)
        }
      }
      return errorResult('Invalid token')
    }
  }
] as MockMethod[]
