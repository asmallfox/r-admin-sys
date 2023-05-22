import type { RouterRaws } from './types'

import { PageEnum } from '@/enums/pageEnum'
import { NOT_FOUNT_ROUTE } from './basic'

import AppLayout from '@/views/layout/layout'
import Auth from '@/views/auth/auth'
import Login from '@/views/login/login'
import LargeScreen from '@/views/layout/echart/largeScreen/largeScreen'

const modules = import.meta.glob('./modules/**/*.tsx', { eager: true })
const routeModules: RouterRaws[] = []

Object.keys(modules).forEach((key) => {
  const module = (modules[key] as any).default
  const mod = Array.isArray(module) ? [...module] : [module]
  routeModules.push(...mod)
})

export const asyncRoutes = [...routeModules]

export const RootRoute: RouterRaws = {
  path: '/',
  element: <AppLayout />,
  children: [],
  redirect: PageEnum.BASE_HOME
}

export const LoginRoute: RouterRaws = {
  path: '/login',
  element: <Login />,
  meta: {
    title: '登录'
  }
}

export const LargeScreenRoute: RouterRaws = {
  path: '/large-screen',
  element: <LargeScreen />,
  meta: {
    title: 'echart大屏'
  }
}

export const AuthRoute: RouterRaws = {
  path: '/auth',
  element: <Auth />,
  meta: {
    title: '路由表'
  }
}

export const basicRoutes = [
  LargeScreenRoute,
  LoginRoute,
  AuthRoute,
  RootRoute,
  NOT_FOUNT_ROUTE
]
