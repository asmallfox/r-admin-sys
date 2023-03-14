import type { RouterRaws } from './types'
import { Navigate } from 'react-router-dom'

import { PageEnum } from '@/enums/pageEnum'

import Login from '@/views/login/login'

const modules = import.meta.glob('./modules/**/*.tsx', { eager: true })
const routeModuleList: RouterRaws[] = []

Object.keys(modules).forEach(key => {
  const module = modules[key].default
  const mod = Array.isArray(module) ? [...module] : [module]
  routeModuleList.push(...mod)
})

export const asyncRoutes = [...routeModuleList]

export const RootRoute: RouterRaws = {
  path: '/',
  element: <Navigate to={PageEnum.BASE_HOME}/>
}

export const LoginRoute: RouterRaws = {
  path: '/login',
  element: <Login />,
  meta: {
    label: '登录'
  }
}
export const basicRoutes = [RootRoute, LoginRoute, ...routeModuleList]
