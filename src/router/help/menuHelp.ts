import type { RouterRaws, MenuItem, IBreadcrumb } from '../types'

import React from 'react'
import { Link } from 'react-router-dom'
import { cloneDeep, sortBy } from 'lodash'

import { isString, isNil } from '@/utils/is'

import { asyncRoutes } from '@/router/routes'

export type MenuItems = MenuItem[]

export type IBreadcrumbs = IBreadcrumb[]

export function pathSnippets(pathname: string): string[] {
  return pathname.split('/').filter((key) => key)
}

// 过滤隐藏菜单
export function filterMenu(routes: RouterRaws[]) {
  const result = routes.filter((route) => {
    const checkRoute = !route.meta?.menuHidden
    if (checkRoute && route.children?.length) {
      route.children = route.children.filter((child) => !child.meta?.menuHidden)
    }
    return checkRoute
  })
  return result
}

// 路由转换menu
export function transformRouteToMenu(routes: RouterRaws[]) {
  let deepData = filterMenu(cloneDeep(routes))
  deepData = sortBy(deepData, (route) => route?.meta?.sortIndex ?? 0)

  const getFormatMenu = (formatMenu: RouterRaws[], result: MenuItems = []) => {
    formatMenu.forEach((route) => {
      const { path, redirect } = route
      const { title, icon, activeMenu } = route.meta || {}
      const menuItem: MenuItem = {
        title,
        path,
        redirect,
        icon,
        label: title,
        active_menu: activeMenu,
        key: pathSnippets(path as string)[0]
      }
      if (route.children?.length) {
        menuItem.children = getFormatMenu(route.children)
      }
      result.push(menuItem)
    })
    return result
  }

  return getFormatMenu(deepData) as MenuItems
}

export function getMenus(routerConf: MenuItems) {
  if (!routerConf) return []

  const finalMenu = menuConfigMapRoutes(routerConf, asyncRoutes)
  return transformRouteToMenu(finalMenu)
}

export function menuConfigMapRoutes(
  menus: MenuItems,
  basicRoutes: RouterRaws[],
  result: RouterRaws[] = []
) {
  menus.forEach((menu) => {
    const checkRoute = {
      ...basicRoutes.find((route) => route.path === menu.path)
    }

    if (checkRoute?.children?.length && menu.children?.length) {
      checkRoute.children = menuConfigMapRoutes(
        menu.children,
        checkRoute.children
      )
    } else {
      delete checkRoute.children
    }
    result.push(checkRoute)
  })
  return result
}

/* 获取路由信息 */
export function getRouteMapItem(path: string, menuList: MenuItems): MenuItem {
  const routePaths = pathSnippets(path)

  const getMenuItem = (menus: MenuItems = [], paths: string[]): MenuItem => {
    let findMenu = menus.find((item) => item.key === paths[0])
    paths.shift()
    if (paths.length > 0) {
      findMenu = getMenuItem(findMenu?.children ?? [], paths) ?? findMenu
    }
    return findMenu as MenuItem
  }

  const routeItem = getMenuItem(menuList, routePaths)

  return {
    ...routeItem,
    path
  }
}

/* 获取路由路径 */
export function getRoutePaths(
  menus: MenuItems,
  path = '',
  paths: string[] = []
): string[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i]
    if (item.key === path) {
      paths.push(path)
      return paths
    } else if (item.children?.length) {
      const res = getRoutePaths(item.children, path, paths)
      if (res?.length) {
        paths.unshift(item.key as string)
        return paths
      }
    }
  }
  return paths
}

export function joinPath(paths: string[] | string) {
  const path = isString(paths) ? paths : paths.join('/')
  if (path.startsWith('/')) {
    return path
  }
  return `/${path}`
}

export function getRouteAllPath(menus: MenuItem[], path = '') {
  const allPath = getRoutePaths(menus, path)
  const getPath = joinPath(allPath)
  return getPath
}

// 获取面包屑
export function getBreadcrumb(path: string, menuList: MenuItems) {
  if (!menuList) return []

  const { active_menu, key: curKey } = getRouteMapItem(path, menuList)

  const paths = pathSnippets(active_menu ? active_menu : path)

  if (!isNil(active_menu)) {
    paths.push(curKey)
  }

  const checkRoute = [
    menuList.find((route) => route?.key === paths[0]) as MenuItem
  ]

  const flattenMenu = (menus: MenuItems, result: IBreadcrumbs = []) => {
    for (const item of menus) {
      const breadItem: IBreadcrumb = {
        title: item.label,
        key: item.key
      }

      if (item.redirect) {
        breadItem.path = item.redirect
      }

      if (item.children?.length) {
        const children = item.children.filter((item) => isNil(item.active_menu))

        const menu = {
          items: children.map((child) => ({
            title: React.createElement(
              Link,
              {
                to:
                  child.redirect ??
                  getRouteAllPath(checkRoute, child.key as string)
              },
              child.label
            ),
            key: child.key
          }))
        }
        Object.assign(breadItem, { menu })
        result = result.concat([breadItem, ...flattenMenu(item.children)])
      } else {
        result.push(breadItem)
      }
    }
    return result
  }

  const breads = flattenMenu(checkRoute)
  return breads.filter((item) => paths.includes(item.key as string))
}
