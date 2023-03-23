import { codeEnum } from './_enum'

export function checkAuthorization(authorization: string) {
  if (authorization) {
    return true
  }
  return false
}

export function errorResponse(code: number, message = 'request error') {
  const errorRes = {
    message,
    code,
    type: 'error'
  }
  switch (code) {
    case codeEnum.BAD_REQUEST:
      errorRes.message = 'Params error!'
      break
    case codeEnum.INVALID_TOKEN:
      errorRes.message = 'Invalid Token!'
      break
    case codeEnum.NOT_FOUND:
      errorRes.message = 'Not Found!'
      break
    case codeEnum.SERVER_ERROR:
      errorRes.message = 'server Error!'
      break
  }

  return errorRes
}
