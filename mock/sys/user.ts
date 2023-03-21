import { MockMethod } from 'vite-plugin-mock'

export default [
  // mock user login
  {
    url: '/lege-api/login',
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
  }
] as MockMethod[]