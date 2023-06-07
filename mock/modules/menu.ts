import { errorResult, RequestParams, successResult, getToken } from '../_utils/_index'
import adminMenu from '../_mockData/_auth/_admin.json'
import testMenu from '../_mockData/_auth/_test.json'
import { adminList } from '../_mockData/_user'
import { PermissionEnum } from '../../src/enums/menuEnum'

export default () => {
  return [
    {
      url: '/basic-api/getMenuList',
      timeout: 1000,
      method: 'get',
      response: (request: RequestParams) => {
        const token = getToken(request.headers)
        if (token) {
          const userInfo = JSON.parse(token)
          const findUser = adminList.find(
            user => user.id === userInfo.id && user.username === userInfo.username
          )
          if (findUser) {
            let menu: Record<string, unknown>[] = []
            switch (findUser.permissions) {
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
  ]
}
