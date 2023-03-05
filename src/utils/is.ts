export const isNil = (val: unknown) => val === null || val === undefined

export const isString = (val: unknown): val is string => typeof val === 'string'