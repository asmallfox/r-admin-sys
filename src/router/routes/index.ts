import type { RouterRaw } from './types'
import { basicRoutes } from './basic'

const layoutRoutes: RouterRaw[] = []

const modules = import.meta.glob('./modules/**.tsx', { eager: true })
Object.keys(modules).forEach(key => {
  const module = (modules[key] as any).default
  const mod = Array.isArray(module) ? [...module] : [module]
  layoutRoutes.push(...mod)
})

export const routes = [...basicRoutes, ...layoutRoutes]

export {
  layoutRoutes
}
