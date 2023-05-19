import type { NonIndexRouteObject } from 'react-router-dom'
import type { MenuProps } from 'antd'

export type ItemType = Required<MenuProps>['items']
export interface MenuItem extends ItemType {
  label: React.ReactNode | string
  key: React.Key
  icon?: React.ReactNode
  redirect?: string
  path?: string
  activeMenu?: string
  children?: MenuItem[]
}

export interface Meta {
  title?: string
  icon?: JSX.Element
  sortIndex?: number
  menuHidden?: boolean
  activeMenu?: string
  authList?: string[]
  permission?: string[]
}

export interface RouterRaws extends Omit<NonIndexRouteObject, 'children'> {
  redirect?: string
  children?: RouterRaws[]
  meta?: Meta
}
