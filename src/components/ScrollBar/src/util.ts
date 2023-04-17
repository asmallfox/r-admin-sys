import type { CSSProperties } from 'react'

const barConst = {
  vertical: {
    size: 'height',
    move: 'Y'
  },
  horizontal: {
    size: 'width',
    move: 'X'
  }
}

export function renderThumb({
  size,
  move,
  bar = barConst['vertical']
}: {
  size: string | number
  move: string | number
  bar?: any
}): CSSProperties {
  const style = {
    [bar.size]: size,
    transform: `translate${bar.move}(${move}%)`
  }
  return style
}
