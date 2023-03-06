import { isNil } from './is'

export const  toStringify = (value: unknown): string => JSON.stringify(value)
export const toParse = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}

class LocalCache {
  setItem(key: string, value: unknown) {
    if (isNil(value)) {
      throw(new Error('Invalid value of setItem'))
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