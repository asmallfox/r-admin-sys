import type { CSSProperties } from 'react'
import { useRef, useContext, useState, useEffect } from 'react'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollBarContext } from './scrollbarContext'
import { renderThumb } from './util'

interface PropsType {
  size: number
  move: number
  ratio: number
  always: boolean
  scrollEvent?: (e: Event) => void
}

function Thumb(props: PropsType) {
  const { always = false } = props
  const thumbRef = useRef<HTMLDivElement>(null)
  const [thumbStyle, setThumbStyle] = useState<CSSProperties>()
  const thumbState: Partial<Record<'X' | 'Y', number>> = {}
  const [currentDown, setCurrentDown] = useState(false)

  const { prefixCls } = useDesign('scroll-thumb')
  const scrollbar = useContext(ScrollBarContext)
  const [visible, setVisible] = useState(false)

  const mouseDownHandler = (e: React.MouseEvent) => {
    setCurrentDown(true)

    window.getSelection()?.removeAllRanges()
    initListener(e)

    thumbState.Y =
      e.nativeEvent.offsetY +
      (scrollbar.wrapElement?.current?.getBoundingClientRect().top ?? 0)
  }

  const initListener = (e: React.MouseEvent) => {
    e.nativeEvent.stopImmediatePropagation()

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    const handleOffset = e.clientY - thumbState.Y
    if (scrollbar?.wrapElement?.current) {
      scrollbar.wrapElement.current.scrollTop = handleOffset / props.ratio
    }
  }

  const mouseUpHandler = () => {
    setCurrentDown(false)
    thumbState.Y = 0
    document.removeEventListener('mousemove', mouseMoveHandler)
  }

  useEffect(() => {
    const { size, move } = props
    setThumbStyle(renderThumb({ size, move }))
  }, [props])

  useEffect(() => {
    if (!always) {
      const mouseenterElement = (): void => {
        setVisible(true)
      }
      const mouseleaveElement = (): void => {
        setVisible(false)
      }
      const scrollbarElement = scrollbar?.scrollbarElement?.current
      if (scrollbarElement) {
        scrollbarElement.addEventListener('mouseenter', mouseenterElement)
        scrollbarElement.addEventListener('mouseleave', mouseleaveElement)
      }

      return () => {
        scrollbar?.scrollbarElement?.current?.removeEventListener(
          'mouseenter',
          mouseenterElement
        )
        scrollbar?.scrollbarElement?.current?.removeEventListener(
          'mouseleave',
          mouseleaveElement
        )
      }
    }
  }, [])

  return (
    <div
      ref={thumbRef}
      className={`${prefixCls} ${
        always || visible || currentDown
          ? prefixCls + '_visible'
          : prefixCls + '_hidden'
      }`}
      onMouseDown={mouseDownHandler}
      style={thumbStyle}
    ></div>
  )
}

export default Thumb
