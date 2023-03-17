import type { RootState } from '@/store'
import { useState } from 'react'

import { useSelector } from 'react-redux'
import { Tag } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'

function HeaderTag() {
  const { prefixCls } = useDesign('header-tag')

  const [tagList] = useState(
    useSelector((state: RootState) => state.menuReducer.tagList)
  )

  const getClass = (othClass: string) => [prefixCls, othClass].join(' ')
  function onClickTag(item: any) {}
  function oncloseTag(item: any) {}
  return (
    <div className={prefixCls}>
      {tagList.map((item, index) => {
        return (
          <Tag
            key={item.routePath}
            closable={index !== 0}
            onClick={() => onClickTag(item)}
            onClose={() => oncloseTag(item)}
          >
            <span className={`${prefixCls}-label`}>{item.label}</span>
          </Tag>
        )
      })}
    </div>
  )
}

export default HeaderTag
