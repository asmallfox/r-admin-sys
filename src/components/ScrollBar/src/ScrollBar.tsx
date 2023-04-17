import '../styles/index.scss'

import { useDesign } from '@/hooks/web/useDesign'
import { useEffect, useRef, useState, useContext, createContext } from 'react'

import Thumb from './Thumb'
import { ScrollBarContext, ScrollBarContextType } from './scrollbarContext'

interface PropsType {
  children?: JSX.Element
  maxHeight?: string
  minSize?: number
}
function ScrollBar(props: PropsType) {
  const { children, minSize = 20 } = props
  const { prefixCls } = useDesign('scroll')

  const wrapRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const value: ScrollBarContextType = { wrapElement: wrapRef }

  const [thumbSize, setThumbSize] = useState('0')
  const [thumbMove, setThumbMove] = useState('0')

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop
    setThumbMove(((scrollTop * 100) / wrapRef.current.offsetHeight) * scale)
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      update()
    })
    if (wrapRef.current) {
      resizeObserver.observe(wrapRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [])

  const update = () => {
    if (wrapRef.current) {
      const offsetHeight = wrapRef.current.offsetHeight
      const scrollHeight = wrapRef.current.scrollHeight

      const originalHeight = offsetHeight ** 2 / scrollHeight
      const height = Math.max(originalHeight, minSize)

      const bl =
        originalHeight /
        (offsetHeight - originalHeight) /
        (height / (offsetHeight - height))
      setScale(bl)
      setThumbSize(`${height}px`)
    }
  }

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-wrap`} ref={wrapRef} onScroll={handleScroll}>
        {children}
      </div>
      <ScrollBarContext.Provider value={value}>
        <Thumb scrollEvent={handleScroll} size={thumbSize} move={thumbMove} />
      </ScrollBarContext.Provider>
    </div>
  )
}

export default ScrollBar
