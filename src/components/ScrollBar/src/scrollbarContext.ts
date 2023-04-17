import { createContext } from 'react'

export interface ScrollBarContextType {
  wrapElement?: React.RefObject<HTMLDivElement>
}

export const ScrollBarContext = createContext<ScrollBarContextType>({})
