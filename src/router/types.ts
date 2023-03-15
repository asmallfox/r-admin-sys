import type { RouterRaws } from './routes/types'

const layoutRoutes: RouterRaws[] = []

const modules = import.meta.glob('./modules/**.tsx', { eager: true })
Object.keys(modules).forEach(key => {
  const module = (modules[key] as any).default
  const mod = Array.isArray(module) ? [...module] : [module]
  layoutRoutes.push(...mod)
})

export {
  layoutRoutes
}