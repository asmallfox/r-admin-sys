export const isNil = (val: unknown) => val === null || val === undefined

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isArray = Array.isArray

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

function typeString(val: unknown, t: string): boolean {
  return Object.prototype.toString.call(val) === `'[object ${t}]'`
}
