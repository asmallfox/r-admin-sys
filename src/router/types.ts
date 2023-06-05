import type { NonIndexRouteObject } from 'react-router-dom'

export interface MenuItem {
  key: string
  title?: string
  label?: string | JSX.Element
  path?: string
  active_menu?: string
  icon?: string | JSX.Element
  redirect?: string
  children?: MenuItem[]
}

export interface Meta {
  title?: string
  icon?: JSX.Element | string
  sortIndex?: number
  menuHidden?: boolean
  activeMenu?: string
  authList?: string[]
  permission?: string[]
}

export interface RouterRaws extends Omit<NonIndexRouteObject, 'children'> {
  name?: string
  redirect?: string
  children?: RouterRaws[]
  meta?: Meta
}

export interface IBreadcrumb {
  title: React.ReactNode | string
  key: React.Key
  path?: string
  menu?: {
    items: IBreadcrumb[]
  }
}
