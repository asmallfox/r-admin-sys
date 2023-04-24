import type { CSSProperties } from 'react'

export const BAR_OPTION = {
  horizontal: {
    size: 'width',
    offset: 'offsetWidth',
    offsetScroll: 'offsetScrollWidth',
    scrollDir: 'scrollLeft',
    position: 'left',
    offsetDir: 'offsetX',
    client: 'clientX',
    move: 'X'
  },
  vertical: {
    size: 'height',
    offset: 'offsetHeight',
    offsetScroll: 'offsetScrollHeight',
    scrollDir: 'scrollTop',
    position: 'top',
    offsetDir: 'offsetY',
    client: 'clientY',
    move: 'Y'
  }
} as const

export function renderThumb({
  size,
  move,
  bar = BAR_OPTION['vertical']
}: {
  size: string | number
  move: string | number
  bar?: any
}): CSSProperties {
  const style = {
    [bar.size]: `${size}px`,
    transform: `translate${bar.move}(${move}px)`
  }
  return style
}
