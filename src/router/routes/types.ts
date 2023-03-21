import type { NonIndexRouteObject } from 'react-router-dom'
import type { MenuProps } from 'antd'

export type MenuItem = MenuProps['items']

export interface Meta {
  title?: string
  icon?: JSX.Element
  sortIndex?: number
  menuHidden?: boolean
}

export interface RouterRaws extends Omit<NonIndexRouteObject, 'children'> {
  redirect?: string
  children?: RouterRaws[]
  meta?: Meta
}
