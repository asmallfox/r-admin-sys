export const config = {
  namespace: 'lege'
}

export function useDesign(prefix: string) {
  const prefixCls = `${config.namespace}-${prefix}`

  const prefixEl = (el: string) => `${prefixCls}-${el}`

  return {
    prefixCls,
    prefixEl
  }
}