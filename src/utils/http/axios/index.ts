import { VAxios } from './Axios'

const { VITE_GLOB_API_URL } = import.meta.env

export function createAxios(opt?: any) {
  if (opt) {
    // console.log('createAxios', opt)
  }
  return new VAxios({
    baseURL: VITE_GLOB_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const defHttp = createAxios()
