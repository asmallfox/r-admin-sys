import type { ScrollbarProps } from '../types'

import { forwardRef } from 'react'

import { useDesign } from '@/hooks/web/useDesign'

const ScrollBar = forwardRef<any, ScrollbarProps>(({ children }, ref) => {
  const { prefixCls, prefixEl } = useDesign('scrollbar')

  return (
    <div ref={ref} className={prefixCls}>
      <div className={prefixEl('wrap')}>
        <div className={prefixEl('content')}>{children}</div>
      </div>
      <div className={prefixEl('thumb')}></div>
    </div>
  )
})

ScrollBar.displayName = 'ScrollBar'

export default ScrollBar
