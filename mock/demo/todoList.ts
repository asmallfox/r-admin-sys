import type { AxiosRequestConfig } from 'axios'
import { MockMethod } from 'vite-plugin-mock'
import { checkAuthorization, errorResponse } from '../_util'
import { codeEnum } from '../_enum'

const list = [
  {
    id: 1,
    content: 'Study React',
    finished: false
  },
  {
    id: 2,
    content: 'Study Node',
    finished: false
  },
  {
    id: 3,
    content: 'Study Vue',
    finished: false
  },
  {
    id: 4,
    content: 'Study Javascript',
    finished: true
  },
  {
    id: 5,
    content: 'Study CSS + HTML',
    finished: true
  }
]

export default [
  // 获取todo-list列表
  {
    url: '/basic-api/todo-list',
    method: 'get',
    response: (requestConfig: AxiosRequestConfig) => {
      const { headers } = requestConfig
      if (!checkAuthorization(headers?.authorization)) {
        return errorResponse(codeEnum.INVALID_TOKEN)
      }
      return {
        code: 200,
        rows: list,
        count: list.length
      }
    }
  },
  // 添加项
  {
    url: '/basic-api/todo-list',
    method: 'put',
    response: (requestConfig: AxiosRequestConfig) => {
      const { body, headers } = requestConfig
      if (!checkAuthorization(headers?.authorization)) {
        return errorResponse(codeEnum.INVALID_TOKEN)
      }
      const exist = list.some(item => item.content === body.content)
      if (exist) {
        return errorResponse(codeEnum.BAD_REQUEST)
      }
      list.push({
        id: list.length,
        content: body.content,
        finished: body.finished ?? false
      })
      return {
        code: 200,
        message: 'success'
      }
    }
  }
] as MockMethod[]
