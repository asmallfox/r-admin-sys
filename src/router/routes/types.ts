import type { MenuProps } from 'antd'

export type MenuItem = MenuProps['items']

export interface Meta {
  label: string
  icon?: JSX.Element
  sortIndex?: number
  menuHidden?: boolean
}

export interface RouterRaws {
  path: string
  element?: JSX.Element
  children?: RouterRaws[]
  meta?: Meta
}
