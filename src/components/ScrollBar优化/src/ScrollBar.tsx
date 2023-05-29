import type { ScrollbarProps } from '../types'

import { forwardRef, useEffect, useRef, useState } from 'react'

import { useDesign } from '@/hooks/web/useDesign'

import './index.scss'

const ScrollBar = forwardRef<any, ScrollbarProps>(({ children }, ref) => {
  const { prefixCls, prefixBase } = useDesign('scrollbar')

  const wrapRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const [thumbSize, setThumbSize] = useState(20)
  const [moveY, setMoveY] = useState(0)

  const thumbStyle = () => {
    return {
      height: thumbSize + 'px',
      transform: `translateY(${moveY}px)`
    }
  }
  console.log('scrollbar')
  const update = () => {
    if (wrapRef.current) {
      const trackSize = wrapRef.current?.offsetHeight
      const scrollHeight = wrapRef.current?.scrollHeight
      const ration = scrollHeight / trackSize
      const height = (trackSize / (scrollHeight + trackSize)) * trackSize
      setTimeout(() => {
        console.log('滑块高度：', height, '滚动高度：',  wrapRef.current?.scrollHeight)
      }, 2000)
      setThumbSize(height)
    }
  }

  const initListener = () => {
    const observe = new MutationObserver(() => {
      window.requestAnimationFrame(update)
    })
    if (wrapRef.current) {
      observe.observe(wrapRef.current, {
        subtree: true,
        childList: true,
        characterData: true
      })
    }

    return observe
  }

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop
    setMoveY(scrollTop)
  }

  useEffect(() => {
    const observe = initListener()

    return () => {
      observe && observe.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={prefixCls}>
      <div className={prefixBase('wrap')} ref={wrapRef} onScroll={handleScroll}>
        <div className={prefixBase('content')}>{children}</div>
      </div>
      <div className={prefixBase('track')}>
        <div
          className={prefixBase('track_thumb')}
          ref={thumbRef}
          style={thumbStyle()}
        ></div>
      </div>
    </div>
  )
})

ScrollBar.displayName = 'ScrollBar'

export default ScrollBar
