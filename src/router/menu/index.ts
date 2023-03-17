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
      if (meta?.menuHidden) return
      const menu: MenuItem = {
        key: path,
        label: meta?.label,
        title: meta?.label,
        icon: meta?.icon
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

export function getRouteMapItem(routes: RouterRaws[] = [], routePath: string) {
  const filterRoutes = routes.filter(item => !item.meta?.menuHidden)
  const routePaths = routePath.split('/').filter(v => v !== '')
  const resPath = routePaths.join('/')
  const getRouteItem = (routes: RouterRaws[], paths: string[]): RouterRaws => {
    let find = routes.find(item => item.path === paths[0])
    paths.shift()
    if (paths.length > 0) {
      find = getRouteItem(find?.children ?? [], paths)
    }
    return find!
  }

  const res = getRouteItem(filterRoutes, routePaths)
  return {
    label: res.meta?.label,
    routePath: resPath
  }
}
