import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig
} from 'axios'
import axios from 'axios'
import { RequestOptions } from 'https'
import { cacheEnum } from '@/enums/cacheEnum'
import localCache from '@/utils/localStore'
import _ from 'lodash'

export class VAxios {
  private axiosInstance: AxiosInstance
  private options: CreateAxiosDefaults

  constructor(options: CreateAxiosDefaults) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  handleRequestParams(url: string, params: Record<string, any>) {
    // 参数转换
    const path = url?.split('?') as string[]
    const data = _.cloneDeep(params)
    const reg = /(?:\{)[a-zA-Z-9]+(?:\})/g
    const bodyParams = path[0].match(reg)
    if (bodyParams?.length) {
      bodyParams.forEach((item) => {
        const varName = item.substring(1, item.length - 1)
        url = url?.replace(item, data[varName])
        delete data[varName]
      })
    }
    return {
      url,
      data
    }
  }

  setupInterceptors() {
    // 添加请求拦截器
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localCache.getItem(cacheEnum.TOKEN_KEY)
      if (token) {
        config.headers.Authorization = JSON.stringify(token)
      }

      const requestConfigData = this.handleRequestParams(config.url as string, config.data)
      config.url = requestConfigData.url
      config.data = requestConfigData.data
      
      return config
    })
    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use((response) => {
      return response
    })
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res) => {
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' }, options)
  }
  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' }, options)
  }
  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' }, options)
  }
  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' }, options)
  }
}
