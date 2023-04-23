import type { RouterRaws, MenuItem } from '@/router/routes/types'

import { sortBy, cloneDeep } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

import { isString } from '@/utils/is'
import { asyncRoutes } from '@/router/routes'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

export function pathSnippets(pathname: string): string[] {
  return pathname.split('/').filter((i) => i)
}

/* 路由转换menu */
export function transformRouteToMenu(routes: RouterRaws[] = []) {
  let cloneRouteList = cloneDeep(routes)
  cloneRouteList = sortBy(
    filterHiddenMenu(cloneRouteList),
    (item) => item?.meta?.sortIndex ?? 0
  )

  const getFormatMenu = (formatMenu: any[]) => {
    for (const item of formatMenu) {
      item.label = item?.meta?.title
      // item.title = item?.meta?.title
      item.icon = item?.meta?.icon
      item.key = pathSnippets(item.path)[0]
      if (item?.children?.length) {
        getFormatMenu(item.children)
      }
    }
  }
  getFormatMenu(cloneRouteList)
  return cloneRouteList as MenuItem[]
}

/* 获取路由信息 */
export function getRouteMapItem(path: string): RouterRaws {
  const routePaths = pathSnippets(path)
  const menuList = getMenus()
  const getRouteItem = (menus: MenuItem[], paths: string[]): ItemType => {
    let find = menus.find((item) => item?.key === paths[0])
    paths.shift()
    if (paths.length > 0) {
      find = getRouteItem((find as any)?.children ?? [], paths)
    }
    return find
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
export function getMenus() {
  return transformRouteToMenu(asyncRoutes)
}

// 获取面包屑
export function getBreadcrumb(path: string) {
  const routes = getMenus()
  const paths = pathSnippets(path)
  const find = cloneDeep([routes.find((route) => route?.key === paths[0])])
  const flattenMenu = (menus: any, result = []) => {
    for (const item of menus) {
      const breadItem = {
        title: item?.label,
        key: item?.key
      }
      if (isString(item?.redirect)) {
        breadItem.path = item.redirect
      }
      if (item.children && item.children.length > 0) {
        breadItem.menu = {
          items: item.children.map((child) => ({
            title: React.createElement(
              Link,
              { to: child.redirect ?? getRouteAllPath(find, child.key) },
              child.title ?? child.meta.title
            ),
            key: child.key
          }))
        }
        result = result.concat([breadItem, ...flattenMenu(item.children)])
      } else {
        result.push(breadItem)
      }
    }
    return result
  }

  const filterResult = flattenMenu(find).filter((item) =>
    paths.includes(item.key)
  )
  return filterResult
}

/* 获取路由路径 */
export function getRoutePaths(menus: any[], path = '', paths = []): string[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i]
    if (item.path === path) {
      paths.push(item.path)
      return paths
    } else if (item?.children?.length) {
      const res = getRoutePaths(item.children, path, paths)
      if (res?.length) {
        paths.unshift(item.path)
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

export function getRouteAllPath(menus: any[], path = '') {
  const allPath = getRoutePaths(menus, path)
  const getPath = joinPath(allPath)
  return getPath
}
