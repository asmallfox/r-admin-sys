import type { RouterRaw, SubMenu } from '@/router/routes/types'

export const matchMenu = (menus: RouterRaw[] = []) => {
  const result: SubMenu[] = []
  menus.forEach((item) => {
    const { path, meta, children = [] } = item
    const menu: SubMenu = {
      key: path,
      label: meta?.label ?? '',
      icon: meta?.icon ?? '',
    }
    if (children.length > 0) {
      menu.children = matchMenu(children)
    }
    result.push(menu)
  })

  return result
}
