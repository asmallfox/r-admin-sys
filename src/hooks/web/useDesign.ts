export const config = {
  namespace: 'lege'
}

export function useDesign(prefix: string) {
  const prefixCls = `${config.namespace}-${prefix}`

  const prefixBase = (str?: string) => {
    return str ? `${prefixCls}-${str}` : prefixCls
  }

  const prefixEl = (elPrefix: string) => `${prefixCls}_${elPrefix}`

  return {
    prefixCls,
    prefixBase,
    prefixEl
  }
}