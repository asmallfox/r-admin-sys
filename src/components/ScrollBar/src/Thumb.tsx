import type { CSSProperties } from 'react'
import { useRef, useContext, useState, useEffect } from 'react'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollBarContext } from './scrollbarContext'
import { renderThumb } from './util'

interface PropsType {
  size: number | string
  move: number | string
  scrollEvent?: (e: Event) => void
}

function Thumb(props: PropsType) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const [thumbStyle, setThumbStyle] = useState<CSSProperties>()
  const thumbState: Partial<Record<'X' | 'Y', number>> = {}
  let currentDown = false

  const { prefixCls } = useDesign('scroll-thumb')
  const scrollbar = useContext(ScrollBarContext)

  const mouseDownHandler = (e: React.MouseEvent) => {
    currentDown = true
    thumbState.Y = e.clientY
    console.log(e)

    window.getSelection()?.removeAllRanges()
    handleMouseEvent(e)
  }

  const handleMouseEvent = (e: React.MouseEvent) => {
    e.nativeEvent.stopImmediatePropagation()

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    console.log(e)
    const scrollTop = e.clientY - thumbState.Y
    if (scrollbar?.wrapElement?.current) {
      scrollbar.wrapElement.current.scrollTop = scrollTop
      console.log(scrollTop)
    }
  }

  const mouseUpHandler = (e: MouseEvent) => {
    if (currentDown) {
      currentDown = false
      thumbState.Y = 0
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }

  useEffect(() => {
    const { size, move } = props
    setThumbStyle(renderThumb({ size, move }))
  }, [props])
  return (
    <div
      ref={thumbRef}
      className={prefixCls}
      onMouseDown={mouseDownHandler}
      style={thumbStyle}
    ></div>
  )
}

export default Thumb
