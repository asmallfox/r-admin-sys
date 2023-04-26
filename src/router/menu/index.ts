import type { RouterRaws, MenuItem } from '@/router/routes/types'

import { sortBy, cloneDeep } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

import { isString } from '@/utils/is'
import { asyncRoutes } from '@/router/routes'

interface Breadcrumb {
  title: React.ReactNode | string
  key: React.Key
  path?: string
  menu?: {
    items: Breadcrumb[]
  }
}

export function pathSnippets(pathname: string): string[] {
  return pathname.split('/').filter((i) => i)
}

/* 路由转换menu */
export function transformRouteToMenu(routes: RouterRaws[], needFilter = true) {
  let cloneRouteList = cloneDeep(routes)
  cloneRouteList = sortBy(
    needFilter ? filterHiddenMenu(cloneRouteList) : cloneRouteList,
    (item) => item?.meta?.sortIndex ?? 0
  )

  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    redirect?: string,
    activeMenu?: string,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      redirect,
      active_menu: activeMenu,
      label,
    } as MenuItem
  }

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
  getFormatMenu(cloneRouteList)
  return cloneRouteList as MenuItem[]
}

/* 获取路由信息 */
export function getRouteMapItem(path: string): MenuItem {
  const routePaths = pathSnippets(path)
  const menuList = getMenus(false)
  const getRouteItem = (menus: MenuItem[], paths: string[]): MenuItem => {
    let findMenu = menus.find((item) => item.key === paths[0])
    paths.shift()
    if (paths.length > 0) {
      findMenu = getRouteItem(findMenu?.children ?? [], paths) ?? findMenu
    }
    return findMenu as MenuItem
  }
  const routeItem = getRouteItem(menuList, routePaths)
  return {
    ...routeItem,
    path
  }
}

/* 过滤隐藏的菜单 */
export function filterHiddenMenu(menus: RouterRaws[]): RouterRaws[] {
  const result = menus.filter((item) => !item?.meta?.menuHidden)
  for (const menu of result) {
    if (menu?.children?.length) {
      menu.children = filterHiddenMenu(menu.children)
    }
  }
  return result
}
/* 获取menus */
export function getMenus(needFilter = true) {
  return transformRouteToMenu(asyncRoutes, needFilter)
}

// 获取面包屑
export function getBreadcrumb(path: string) {
  const routes = getMenus()
  const paths = pathSnippets(path)
  const findRoute = cloneDeep([
    routes.find((route) => route?.key === paths[0])
  ]) as MenuItem[]
  const flattenMenu = (menus: MenuItem[], result: Breadcrumb[] = []) => {
    for (const item of menus) {
      const breadItem: Breadcrumb = {
        title: item.label,
        key: item.key
      }
      if (item.redirect) {
        breadItem.path = item.redirect
      }
      if (item.children && item.children.length > 0) {
        const menu = {
          items: item.children.map((child) => ({
            title: React.createElement(
              Link,
              {
                to:
                  child.redirect ??
                  getRouteAllPath(findRoute, child.key as string)
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

  const filterResult = flattenMenu(findRoute).filter((item) =>
    paths.includes(item.key as string)
  )
  return filterResult
}

/* 获取路由路径 */
export function getRoutePaths(
  menus: MenuItem[],
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
