import { createContext } from 'react'

export interface ScrollBarContextType {
  scrollbarElement?: React.RefObject<HTMLDivElement>
  wrapElement?: React.RefObject<HTMLDivElement>
}

export const ScrollBarContext = createContext<ScrollBarContextType>({})
