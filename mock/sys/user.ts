import { MockMethod } from 'vite-plugin-mock'
import _ from 'lodash'
import { adminList, ordinaryUsers } from '../data/userData'
import { successResult, errorResult, RequestParams, getToken } from '../_util'

export default [
  // mock user login
  {
    url: '/basic-api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const findUser = adminList.find((item) => item.username === username)
      if (findUser && findUser.password === password) {
        const data = {
          token: JSON.stringify({
            username: username,
            id: findUser.id,
            permissions: findUser.permissions
          }),
          userInfo: findUser
        }
        return successResult(data)
      }
      return errorResult('Incorrect username ro password')
    }
  },
  // mock userInfo
  {
    url: '/basic-api/userinfo',
    method: 'get',
    response: (request: RequestParams) => {
      const token = getToken(request.headers)
      if (token) {
        const { id, username } = JSON.parse(token)
        const checkUser = adminList.find(
          (item) => item.id === id && item.username === username
        )
        if (checkUser) {
          return successResult(checkUser)
        }
      }
      return errorResult()
    }
  },
  // mock user list admin
  {
    url: '/basic-api/user-list',
    method: 'get',
    response: ({ query }) => {
      const {
        page = 1,
        pageSize = 10,
        order = 'asc',
        username,
        nickname
      } = query

      // desc 降序、asc 升序
      let result = _.cloneDeep(adminList).sort((i1, i2) => {
        if (order === 'asc') {
          return i1.createTime - i2.createTime
        } else if (order === 'desc') {
          return i2.createTime - i1.createTime
        }
        return 0
      })
      if (username || nickname) {
        result = result.filter((item) => {
          if (username !== undefined && nickname !== undefined) {
            return (
              item.username.indexOf(username) > -1 &&
              item.nickname.indexOf(nickname) > -1
            )
          }
          return (
            item.username.indexOf(username) > -1 ||
            item.nickname.indexOf(nickname) > -1
          )
        })
      }

      const start = (page - 1) * pageSize
      const end = start + Number(pageSize)
      result = result.slice(start, end)
      const data = {
        rows: result.map((item) => ({
          ...item,
          id: item.id.toString(),
          role: item.role.toString()
        })),
        total: adminList.length
      }
      return successResult(data)
    }
  },
  // mock user delete admin
  {
    url: '/basic-api/delete-user-by-id',
    method: 'delete',
    response: ({ body }) => {
      try {
        const index = adminList.findIndex((item) => item.id === Number(body.id))
        if (index === -1) throw new Error('Invalid id')
        adminList.splice(index, 1)
        return successResult(null, 'Delete by id successfully')
      } catch (error) {
        return errorResult(error.message)
      }
    }
  },
  // mock user add admin
  {
    url: '/basic-api/add-user',
    method: 'post',
    response: ({ body }) => {
      const { username, nickname, role, description } = body
      const existUser = adminList.some((item) => item.username === username)
      if (!username || !nickname || !role) {
        return {
          code: 404,
          data: {
            message: 'Please input all fields'
          },
          type: 'error'
        }
      } else if (existUser) {
        return {
          code: 404,
          data: {
            message: 'user already exists'
          },
          type: 'error'
        }
      }
      adminList.push({
        id: adminList.length + 1,
        username,
        nickname,
        role,
        description,
        createTime: Date.now()
      })
      return {
        code: 200,
        data: {
          message: 'Add user successfully'
        }
      }
    }
  },
  // mock user update admin
  {
    url: '/basic-api/update-user-by-id/:id',
    method: 'put',
    response: ({ body, query }) => {
      const { id } = query
      const index = adminList.findIndex((item) => item.id === Number(id))
      if (index !== -1) {
        adminList[index] = {
          ...adminList[index],
          ...body
        }
      } else {
        return {
          code: 404,
          data: {
            message: 'Invalid id'
          },
          type: 'error'
        }
      }
      return {
        code: 200,
        data: {
          message: 'Update user successfully'
        }
      }
    }
  },
  // mock user list 普通用户
  {
    url: '/basic-api/ordinary-user-list',
    method: 'get',
    response: (params) => {
      console.log(params)

      return {
        code: 200,
        data: {
          rows: ordinaryUsers,
          total: ordinaryUsers.length
        }
      }
    }
  }
] as MockMethod[]
