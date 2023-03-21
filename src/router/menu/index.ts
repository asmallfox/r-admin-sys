import type { RouterRaws } from '@/router/routes/types'
import type { MenuProps } from 'antd'

import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

import { asyncRoutes } from '@/router/routes'

export type MenuItem = Required<MenuProps>['items'][number]

export function pathSnippets(pathname: string): string[] {
  return pathname.split('/').filter((i) => i)
}

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
  const routePaths = pathSnippets(routePath)
  const resPath = routePaths.join('/')
  const filterRoutes = routes.filter((item) => !item.meta?.menuHidden)
  const getRouteItem = (routes: RouterRaws[], paths: string[]): RouterRaws => {
    let find = routes.find((item) => item.path === paths[0])
    paths.shift()
    if (paths.length > 0) {
      find = getRouteItem(find?.children ?? [], paths)
    }
    return find as RouterRaws
  }

  const res = getRouteItem(filterRoutes, routePaths)
  return {
    label: res.meta?.label,
    routePath: resPath
  }
}

export function getRoutePath(menuRaw: RouterRaws | RouterRaws[], key: string, reslut = []) {
  const menus = Array.isArray(menuRaw) ? menuRaw : [menuRaw]
  for (const item of menus) {
    if (item.path === key) {
      result.push(item.path)
    }
  }
}

export function getBreadcrumb(path: string) {
  const routes = matchMenu(asyncRoutes)
  const paths = pathSnippets(path)
  const find = _.cloneDeep(routes.find((route) => route.key === paths[0]))

  const flattenMenu = (menus, result = []) => {
    for (const item of menus) {
      const breadItem = {
        title: item.title,
        key: item.key
      }
      if (item.children && item.children.length > 0) {
        breadItem.menu = {
          items: item.children.map((child) => ({
            title: React.createElement(
              Link,
              { to: `/${item.key}/${child.key}` },
              child.title
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

  const filterResult = flattenMenu([find]).filter((item) =>
    paths.includes(item.key)
  )
  console.log(filterResult)
  return filterResult
}
