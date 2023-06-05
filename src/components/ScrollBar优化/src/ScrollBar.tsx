import type { ScrollbarProps } from '../types'

import { forwardRef, useEffect, useRef, useState } from 'react'

import { useDesign } from '@/hooks/web/useDesign'

import './index.scss'

const ScrollBar = forwardRef<any, ScrollbarProps>(
  ({ children, style }, ref) => {
    const { prefixCls, prefixBase } = useDesign('scrollbar')

    const wrapRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)

    const [thumbSize, setThumbSize] = useState(20)
    const [moveY, setMoveY] = useState(0)
    const [rationY, setRationY] = useState(1)

    const thumbStyle = () => {
      return {
        height: thumbSize + 'px',
        transform: `translateY(${moveY}px)`
      }
    }
    const update = () => {
      console.log('=== update ===')
      if (wrapRef.current) {
        const trackSize = wrapRef.current?.offsetHeight
        const scrollHeight = wrapRef.current?.scrollHeight
        const height = trackSize ** 2 / scrollHeight
        const rationY = (trackSize - height) / scrollHeight
        console.log(
          '滑块高度：',
          height,
          '容器高度：',
          trackSize,
          '滚动高度：',
          wrapRef.current?.scrollHeight,
          '比例：',
          rationY,
          trackSize - height
        )
        setTimeout(() => {
          console.log(
            '滑块高度：',
            height,
            '容器高度：',
            trackSize,
            '滚动高度：',
            wrapRef.current?.scrollHeight,
            '比例：',
            rationY,
            trackSize - height
          )
        }, 2000)
        setRationY(rationY)
        setThumbSize(height)
      }
    }

    const handleScroll = () => {
      if (wrapRef?.current) {
        setMoveY(wrapRef.current.scrollTop * rationY)
      }
    }

    const handleResize = () => {
      window.requestAnimationFrame(() => {
        update()
        handleScroll()
      })
    }

    const initObserver = () => {
      const observe = new MutationObserver(handleResize)

      if (wrapRef.current) {
        console.log('o')
        observe.observe(wrapRef.current, {
          subtree: true,
          childList: true,
          characterData: true
        })
      }

      return observe
    }

    useEffect(() => {
      console.log('==')
      const observe = initObserver()
      return () => {
        observe && observe.disconnect()
      }
    }, [])

    return (
      <div ref={ref} className={prefixCls} style={style}>
        <div
          className={prefixBase('wrapper')}
          ref={wrapRef}
          onScroll={handleScroll}
        >
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
  }
)

ScrollBar.displayName = 'ScrollBar'

export default ScrollBar
