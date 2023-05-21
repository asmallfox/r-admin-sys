import type { RouterRaws } from '@/router/routes/types'

import { cloneDeep, filter } from 'lodash'
import { Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { asyncRoutes } from '@/router/routes'

const modules = import.meta.glob('./modules/**/*.tsx', { eager: true })
const routeModules: RouterRaws[] = []

Object.keys(modules).forEach((key) => {
  const module = (modules[key] as any).default
  const mod = Array.isArray(module) ? [...module] : [module]
  routeModules.push(...mod)
})

export function routeFactory(rootRoutes: RouterRaws[]) {
  const factory = (routes: RouterRaws[], result: RouterRaws[] = []) => {
    routes.forEach((route) => {
      if (route.children?.length) {
        route.children = factory(route.children)
      }
      if (route.redirect) {
        result.push({
          path: route.path,
          element: <Navigate to={route.redirect} />
        })
      }
      result.push(route)
    })
    return result
  }
  return factory(cloneDeep(rootRoutes)) ?? []
}

export function lazyComponent(path: string, loading = <span>loading...</span>) {
  const LyComponent = lazy(() => import(`/${path}`))
  return (
    <Suspense fallback={loading}>
      <LyComponent />
    </Suspense>
  )
}

export const dynamicRoutes = (menuList: any[]) => {
  if (!menuList) return
  const filterRoute = (
    routes: any[],
    configRoutes: any[],
    result: any[] = []
  ) => {
    routes.forEach((route) => {
      const checkRoute = configRoutes.find((item) => item.path === route.path)
      if (checkRoute) {
        const routeItem = { ...checkRoute, children: [] }
        if (checkRoute.children?.length > 0) {
          routeItem.children = filterRoute(
            route.children,
            checkRoute.children,
            routeItem.children
          )
        } else {
          delete routeItem.children
        }
        result.push(routeItem)
      }
    })
    return result
  }
  return filterRoute(menuList, asyncRoutes)
}

export function filterPermission(routes: RouterRaws[], permission: string) {
  const checkPermission = (item: RouterRaws, permission: string) =>
    !item.meta?.permission ||
    item.meta.permission.includes(permission as string)

  const result = routes.filter((route) => {
    const isPass = checkPermission(route, permission)
    if (isPass && route.children?.length) {
      route.children = route.children.filter(child => checkPermission(child, permission))
    }
    return isPass
  })

  return result
}

export { routeModules }
