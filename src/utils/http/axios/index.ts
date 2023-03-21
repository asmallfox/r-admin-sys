import { VAxios } from './Axios'

export function createAxios(opt?: any) {
  return new VAxios({
    baseURL: '/lege-api',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const defHttp = createAxios()
