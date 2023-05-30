import { isNil, isString } from './is'

export const toStringify = (value: unknown): string => {
  return isString(value) ? value : JSON.stringify(value)
}
export const toParse = (str: string) => {
  try {
    const value = JSON.parse(str)
    return value
  } catch (error) {
    if (isNil(str)) {
      console.error(error)
      return null
    } else {
      return str
    }
  }
}

class LocalCache {
  setItem(key: string, value: unknown) {
    if (isNil(value)) {
      throw new Error('Invalid value of setItem')
    }
    window.localStorage.setItem(key, toStringify(value))
  }
  getItem(key: string) {
    const strData = window.localStorage.getItem(key)
    return strData ? toParse(strData) : null
  }
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  clear() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
