import { CodeEnum } from './_enum'

export function checkAuthorization(authorization: string) {
  if (authorization) {
    return true
  }
  return false
}

export interface RequestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

export function successResult(data: any, message = 'Request Successful') {
  return {
    data,
    message,
    code: 200,
    type: 'success'
  }
}

export function errorResult(message = 'Request Error') {
  return {
    message,
    code: 404,
    type: 'error'
  }
}

export function errorResponse(code: number, message = 'request error') {
  const errorRes = {
    message,
    code,
    type: 'error'
  }
  switch (code) {
    case CodeEnum.BAD_REQUEST:
      errorRes.message = 'Params error!'
      break
    case CodeEnum.INVALID_TOKEN:
      errorRes.message = 'Invalid Token!'
      break
    case CodeEnum.NOT_FOUND:
      errorRes.message = 'Not Found!'
      break
    case CodeEnum.SERVER_ERROR:
      errorRes.message = 'server Error!'
      break
  }

  return errorRes
}

// 获取Token
export function getToken(headers: any) {
  return headers?.authorization
}
