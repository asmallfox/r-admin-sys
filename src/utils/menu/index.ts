import type { RouterRaws } from '@/router/routes/types'
import type { MenuProps } from 'antd'

import _ from 'lodash'

export type MenuItem = Required<MenuProps>['items'][number]

export const matchMenu = (routes: RouterRaws[] = []): MenuItem[] => {
  const sortMenus = _.sortBy(routes, (item) => item.meta?.sortIndex || 0)

  const mapMenu = (menus: RouterRaws[]) => {
    const result: MenuItem[] = []
    menus.forEach((item) => {
      const { path, meta, children } = item
      const menu: MenuItem = {
        key: path,
        label: meta?.label,
        icon: meta?.icon,
        children: undefined
      }
      if (children && children.length > 0) {
        menu['children'] = mapMenu(children)
      }
      result.push(menu)
    })
    return result
  }

  return mapMenu(sortMenus)
}
