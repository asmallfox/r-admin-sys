import { MockMethod } from 'vite-plugin-mock'
import _, { filter } from 'lodash'

const userType = [1, 2, 3, 4]

const userList = [
  {
    id: 1,
    username: 'Tom',
    nickname: '张三',
    role: userType[0],
    createTime: 1682385080446,
    description: '是劳动法律精神独立房间'
  },
  {
    id: 2,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1682643537823,
    description: '开发人员'
  },
  {
    id: 3,
    username: 'admin',
    nickname: '管理人员1',
    role: userType[1],
    createTime: 1514569812000,
    description: '系统管理员2'
  },
  {
    id: 4,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  },
  {
    id: 5,
    username: 'Tom',
    nickname: '张三',
    role: userType[0],
    createTime: 1514764800000,
    description: '系统管理员1'
  },
  {
    id: 6,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1514764800000,
    description: '开发人员'
  },
  {
    id: 7,
    username: 'admin',
    nickname: '管理人员1',
    role: userType[1],
    createTime: 1514764800000,
    description: '系统管理员2'
  },
  {
    id: 8,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  },
  {
    id: 9,
    username: 'Tom',
    nickname: '张三',
    role: userType[0],
    createTime: 1514764800000,
    description: '系统管理员1'
  },
  {
    id: 10,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1514764800000,
    description: '开发人员'
  },
  {
    id: 11,
    username: 'admin',
    nickname: '管理人员1',
    role: userType[1],
    createTime: 1514764800000,
    description: '系统管理员2'
  },
  {
    id: 12,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  },
  {
    id: 13,
    username: 'Tom',
    nickname: '张三',
    role: userType[0],
    createTime: 1514764800000,
    description: '系统管理员1'
  },
  {
    id: 14,
    username: 'smallfox',
    nickname: '小狐幽',
    role: userType[1],
    createTime: 1514764800000,
    description: '开发人员'
  },
  {
    id: 15,
    username: 'admin',
    nickname: '管理人员1',
    role: userType[1],
    createTime: 1514764800000,
    description: '系统管理员2'
  },
  {
    id: 16,
    username: 'asdf',
    nickname: '王五',
    role: userType[2],
    createTime: 1514764800000,
    description: '系统管理员3'
  }
]

const ordinaryUsers = new Array(30).fill(0).map((_, index) => {
  return {
    id: index + 1,
    username: `小狐幽${index + 1}`,
    account: 'smallfox',
    email: 'smallfox@gmail.com',
    createTime: 1514764800000,
    updateTime: 1514764800000
  }
})

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
      let result = _.cloneDeep(userList).sort((i1, i2) => {
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
      return {
        code: 200,
        data: {
          rows: result.map((item) => ({
            ...item,
            id: item.id.toString(),
            role: item.role.toString()
          })),
          total: userList.length
        }
      }
    }
  },
  // mock user delete admin
  {
    url: '/basic-api/delete-user-by-id',
    method: 'delete',
    response: ({ body }) => {
      try {
        const index = userList.findIndex((item) => item.id === Number(body.id))
        if (index === -1) throw new Error('Invalid id')
        userList.splice(index, 1)
        return {
          code: 200,
          data: {
            message: 'Delete by id successfully'
          }
        }
      } catch (error) {
        return {
          code: 404,
          data: {
            message: 'Delete by id failed'
          },
          type: 'error'
        }
      }
    }
  },
  // mock user add admin
  {
    url: '/basic-api/add-user',
    method: 'post',
    response: ({ body }) => {
      const { username, nickname, role, description } = body
      const existUser = userList.some((item) => item.username === username)
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
      userList.push({
        id: userList.length + 1,
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
      const index = userList.findIndex((item) => item.id === Number(id))
      if (index !== -1) {
        userList[index] = {
          ...userList[index],
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
