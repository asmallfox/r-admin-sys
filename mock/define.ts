import type { MockConfig } from 'vite-plugin-mock'

export default (config: MockConfig) => {
  return [
    {
      url: '/api/testRestful/:id',
      method: 'post',
      response: ({ query, body }: any) => {
        console.log('query>>>>>>>>', query)
        console.log('body>>>>>>>>', body)
        return {
          code: 0,
          message: 'ok',
          data: {
            roleName: 'admin',
            roleValue: 'admin',
          },
        }
      },
    },
    {
      url: '/api/getRoleById',
      method: 'get',
      response: ({ query }: any) => {
        console.log('id>>>>>>>>', query.id)
        return {
          code: 0,
          message: 'ok',
          data: {
            roleName: 'admin',
            roleValue: 'admin',
          },
        }
      },
    },
  ]
}
