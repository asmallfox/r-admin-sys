import { isArray } from '@/utils/is'

export function useProps(props?: Record<string, unknown>) {
  const getClass = (clsName: string | Array<string>) => {
    if (props?.className) return clsName

    const propClass = props?.className ?? ''

    return `${propClass} ${
      isArray(propClass) ? propClass.join(' ') : propClass
    }`
  }

  return {
    className: '',
    style: {},
    ...props,
    getClass
  }
}
