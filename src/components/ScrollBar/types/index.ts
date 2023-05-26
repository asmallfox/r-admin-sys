import type { CSSProperties } from 'react'

export interface ScrollbarProps {
  children?: JSX.Element | JSX.Element[]
  minSize?: number
  always?: boolean
  style?: CSSProperties
  color?: string
  className?: string
}
