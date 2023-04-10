import '../styles/index.scss'

import { useDesign } from '@/hooks/web/useDesign'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useState
} from 'react'

interface PropsType {
  children?: JSX.Element
}

function ScrollBar(props: PropsType) {
  const { children } = props
  const { prefixCls } = useDesign('scroll')

  const wrapRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const [wrapHeight, setWrapHeight] = useState(0)

  const thumbStyle = {
    transform: 'translateY(0px)'
  }

  let currentDown = false
  let thumbState = 0

  let wrapElement: DOMRect

  const mouseDownHandler = (e: React.MouseEvent) => {
    currentDown = true
    window.getSelection()?.removeAllRanges()
    handleMouseEvent(e)

    thumbState = wrapElement.top + e.nativeEvent.offsetY
  }

  const handleMouseEvent = (e: React.MouseEvent) => {
    e.nativeEvent.stopImmediatePropagation()
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    const scrollTop = e.pageY - thumbState
    const thumbElement = thumbRef.current
    if (thumbElement) {
      if (
        scrollTop >= 0 &&
        scrollTop <= wrapElement.height - thumbElement.offsetHeight
      ) {
        setThumbStyle(scrollTop)
        const wrapElement = wrapRef.current
        wrapRef.current.scrollTop =
          (wrapElement.scrollHeight / wrapElement.offsetHeight) * scrollTop
      }
    }
  }
  const mouseUpHandler = (e: MouseEvent) => {
    if (currentDown) {
      currentDown = false
      thumbState = 0
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }

  const handleScroll = (e) => {
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    const move =
      scrollTop /
      ((scrollHeight - offsetHeight) /
        (offsetHeight - thumbRef.current?.offsetHeight))
    setThumbStyle(move)
  }

  const setThumbStyle = (move: number) => {
    if (thumbRef.current) {
      thumbRef.current.style.transform = `translateY(${move}px)`
    }
  }

  useEffect(() => {
    wrapElement = wrapRef.current?.getBoundingClientRect() as DOMRect
    if (thumbRef.current && wrapRef.current) {
      thumbRef.current.style.height = `${
        (wrapRef.current.offsetHeight / wrapRef.current.scrollHeight) *
        wrapRef.current.offsetHeight
      }px`
    }
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      console.log('========')
    })
    if (wrapRef.current) {
      resizeObserver.observe(wrapRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className={prefixCls}>
      <div
        className={`${prefixCls}-wrap`}
        ref={wrapRef}
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div
        ref={thumbRef}
        className={`${prefixCls}-thumb`}
        onMouseDown={mouseDownHandler}
      ></div>
    </div>
  )
}

export default ScrollBar
