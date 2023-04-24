import type { CSSProperties } from 'react'
import { useRef, useContext, useState, useEffect } from 'react'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollBarContext } from './config/scrollbarContext'
import { renderThumb, BAR_OPTION } from './util'
import { TinyColor } from '@ctrl/tinycolor'

interface PropsType {
  size: number
  move: number
  ratio: number
  always: boolean
  color?: string
  scrollEvent?: (e: Event) => void
}

function Thumb(props: PropsType) {
  const { always = false } = props

  const { prefixCls } = useDesign('scroll-thumb')
  const scrollbar = useContext(ScrollBarContext)

  const thumbRef = useRef<HTMLDivElement>(null)
  const [thumbStyle, setThumbStyle] = useState<CSSProperties>()
  const [currentDown, setCurrentDown] = useState(false)
  const [visible, setVisible] = useState(false)
  const thumbState: Partial<Record<'offsetX' | 'offsetY', number>> = {}
  const bar = BAR_OPTION['vertical']

  const color = new TinyColor(props.color)

  const [barStyle, setBarStyle] = useState<CSSProperties>(
    color.isValid
      ? {
          backgroundColor: color.toRgbString()
        }
      : {}
  )

  const customThumbAttrs = () => {
    if (props.color && !color.isValid) {
      throw new Error('Invalid color')
    }
    return {
      onMouseEnter: () => {
        setBarStyle({
          ...barStyle,
          backgroundColor: color.tint(50).toString()
        })
      },
      onMouseLeave: () => {
        setBarStyle({
          ...barStyle,
          backgroundColor: color.toRgbString()
        })
      }
    }
  }

  const mouseDownHandler = (e: React.MouseEvent) => {
    setCurrentDown(true)

    window.getSelection()?.removeAllRanges()
    initListener(e)

    thumbState[bar.offsetDir] =
      e.nativeEvent[bar.offsetDir] +
      (scrollbar.wrapElement?.current?.getBoundingClientRect()[bar.position] ??
        0)
  }

  const initListener = (e: React.MouseEvent) => {
    e.nativeEvent.stopImmediatePropagation()

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    const handleOffset = e[bar.client] - (thumbState[bar.offsetDir] ?? 0)
    if (scrollbar?.wrapElement?.current) {
      scrollbar.wrapElement.current[bar.scrollDir] = handleOffset / props.ratio
    }
  }

  const mouseUpHandler = () => {
    setCurrentDown(false)
    thumbState[bar.offsetDir] = 0
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
      style={{ ...thumbStyle, ...barStyle }}
      {...customThumbAttrs()}
    ></div>
  )
}

export default Thumb
