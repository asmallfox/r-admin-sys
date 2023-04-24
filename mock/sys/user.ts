import { MockMethod } from 'vite-plugin-mock'

const userType = [1, 2, 3, 4]

const userList = [
  {
    id: 1,
    username: 'Tom',
    nickname: '张三',
    type: userType[0],
    createTime: 1514764800000,
    description: '系统管理员1'
  },
  {
    id: 2,
    username: 'smallfox',
    nickname: '小狐幽',
    type: userType[1],
    description: '开发人员'
  },
  {
    id: 3,
    username: 'admin',
    nickname: '管理人员1',
    type: userType[1],
    description: '系统管理员2'
  },
  {
    id: 4,
    username: 'asdf',
    nickname: '王五',
    type: userType[2],
    description: '系统管理员3'
  }
]

export default [
  // mock user login
  {
    url: '/basic-api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          data: {
            token: 'user token by mock'
          }
        }
      } else {
        return {
          code: 404,
          message: 'error',
          type: 'error'
        }
      }
    }
  },
  // mock user list
  {
    url: '/basic-api/user-list',
    method: 'get',
    response: ({ body }) => {
      console.log(body)

      return {
        code: 200,
        data: {
          rows: userList
        }
      }
    }
  }
] as MockMethod[]
