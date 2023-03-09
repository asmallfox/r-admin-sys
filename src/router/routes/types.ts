import type { ReactNode } from 'react'
import type { MenuProps } from 'antd'

export type MenuItem = MenuProps['items']

export interface Meta extends Omit<MenuItem, 'undefined'> {
  sortIndex?: number
  menuHidden?: boolean
}

export interface RouterRaws {
  path: string
  element: ReactNode
  children: RouterRaws[]
  meta: MenuProps & {
    sortIndex?: number
    menuHidden?: boolean
  }
}
