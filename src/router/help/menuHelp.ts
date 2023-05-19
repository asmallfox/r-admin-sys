import type { RouterRaws, MenuItem } from '../routes/types'
import { cloneDeep, sortBy } from 'lodash'

export function pathSnippets(pathname: string): string[] {
  return pathname.split('/').filter((i) => i)
}

export function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  redirect?: string,
  activeMenu?: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    redirect,
    active_menu: activeMenu,
    label
  } as MenuItem
}

export function transformRouteToMenu(routes: RouterRaws[]) {
  const deepData = sortBy(cloneDeep(routes), (route) => {
    return route?.meta?.sortIndex ?? 0
  })

  const getFormatMenu = (formatMenu: RouterRaws[]) => {
    for (let i = 0; i < formatMenu.length; i++) {
      const item = formatMenu[i]
      if (item.children?.length) {
        getFormatMenu(item.children)
      }
      const label = item.meta?.title
      const icon = item.meta?.icon
      const activeMenu = item.meta?.active_menu
      const redirect = item.redirect
      const children = item.children?.length
        ? (item.children as MenuItem[])
        : undefined
      const path = pathSnippets(item.path as string)[0]
      formatMenu[i] = getItem(label, path, icon, redirect, activeMenu, children)
    }
  }
  getFormatMenu(deepData)
  return deepData as MenuItem[]
}

export function getMenus(menuList = [], isFilter = true) {
  console.log(menuList)
   return []
}
