import '../styles/index.scss'

import { useDesign } from '@/hooks/web/useDesign'
import { CSSProperties, useEffect, useRef, useState } from 'react'

import Thumb from './Thumb'
import { ScrollBarContext, ScrollBarContextType } from './config/scrollbarContext'

interface PropsType {
  children?: JSX.Element
  minSize?: number
  always?: boolean
  style?: CSSProperties,
  color?: string
}
function ScrollBar(props: PropsType) {
  const { children, minSize = 20, always = false, style } = props
  const { prefixCls } = useDesign('scroll')

  const scrollbarRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const value: ScrollBarContextType = {
    scrollbarElement: scrollbarRef,
    wrapElement: wrapRef
  }

  const [thumbSize, setThumbSize] = useState(0)
  const [thumbMove, setThumbMove] = useState(0)
  const [ratioY, setRatioY] = useState(1)

  const handleScroll = () => {
    if (wrapRef?.current) {
      setThumbMove(wrapRef.current.scrollTop * ratioY)
    }
  }

  const update = () => {
    if (wrapRef.current) {
      const offsetHeight = wrapRef.current.offsetHeight
      const scrollHeight = wrapRef.current.scrollHeight

      const originalHeight = offsetHeight ** 2 / scrollHeight
      const height = Math.max(originalHeight, minSize)

      const percY = (offsetHeight - height) / (scrollHeight - offsetHeight)
      setRatioY(percY)
      setThumbSize(height < offsetHeight ? height : 0)
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        handleScroll()
        update()
      })
    })
    if (wrapRef.current && contentRef.current) {
      resizeObserver.observe(wrapRef.current)
      resizeObserver.observe(contentRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className={prefixCls} ref={scrollbarRef} style={style}>
      <div
        className={`${prefixCls}-wrap`}
        ref={wrapRef}
        onScroll={handleScroll}
      >
        <div ref={contentRef}>{children}</div>
      </div>
      <ScrollBarContext.Provider value={value}>
        <Thumb
          scrollEvent={handleScroll}
          size={thumbSize}
          move={thumbMove}
          ratio={ratioY}
          always={always}
          color={props.color}
        />
      </ScrollBarContext.Provider>
    </div>
  )
}

export default ScrollBar
