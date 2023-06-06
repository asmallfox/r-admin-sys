import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export function createMock(mocks: MockMethod[]) {
  const result: any[] = []

  console.log(Mock)

  mocks.forEach((mock) => {
    const { url, method = 'get', response, timeout } = mock

    if (timeout) Mock.setup(timeout)

    result.push(
      Mock.mock(url, method, (requestParams: any) => {
        if (requestParams) {
          const data = { ...requestParams }
          const keys = ['body', 'query', 'params']
          keys.forEach((key) => {
            data[key] = data[key] ? JSON.parse(data[key]) : data[key]
          })
          console.log(data, 'data')
          return response(data)
        }
      })
    )
  })

  return result
}
