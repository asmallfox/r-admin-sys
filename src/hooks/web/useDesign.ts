export const config = {
  namespace: 'lege'
}

export function useDesign(prefix: string) {
  const prefixCls = `${config.namespace}-${prefix}`

  return {
    prefixCls
  }
}