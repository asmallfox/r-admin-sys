import { CSSProperties } from 'react'

declare global {
  declare interface DefaultProps {
    className?: string
    style?: CSSProperties
  }

  declare interface ViteEnv {
    VITE_USE_MOCK: boolean
  }
}
