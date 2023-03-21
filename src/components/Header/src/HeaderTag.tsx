import type { RootState } from '@/store'
import type { TagItem } from '@/store/modules/menu'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tag } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { PageEnum } from '@/enums/pageEnum'
import { removeTag } from '@/store/modules/menu'

function HeaderTag() {
  const { prefixCls } = useDesign('header-tag')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const menuSelectList = useSelector(
    (state: RootState) => state.menuReducer.tagList
  )
  const [tagList, setTagList] = useState(menuSelectList)

  const getClass = (othClass?: string) =>
    [`${prefixCls}-item`, othClass].join(' ')

  function oncloseTag(item: TagItem) {
    const lastMenuItem = tagList.at(-1)
    if (lastMenuItem?.path === item.path) {
      navigate(tagList.at(-2)?.path ?? PageEnum.BASE_HOME)
    }
    dispatch(removeTag(item.path))
  }

  useEffect(() => {
    setTagList(menuSelectList)
  }, [menuSelectList])
  return (
    <div className={`${prefixCls} px-2`}>
      {tagList.map((item, index) => {
        const clsName = getClass(
          pathname === item.path ? `${prefixCls}-item__action` : ''
        )
        return (
          <Tag
            className={clsName}
            key={item.path}
            closable={index !== 0}
            onClick={() => navigate(item.path)}
            onClose={() => oncloseTag(item)}
          >
            {item.label}
          </Tag>
        )
      })}
    </div>
  )
}

export default HeaderTag
