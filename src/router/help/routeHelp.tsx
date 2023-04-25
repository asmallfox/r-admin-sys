import type { RouterRaws } from '@/router/routes/types'

import { cloneDeep } from 'lodash'
import { Navigate } from 'react-router-dom'

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

export { routeModules }
