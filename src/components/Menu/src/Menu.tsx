import type { MenuProps } from 'antd'

import { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import _ from 'lodash'

import { layoutRoutes } from '@/router/routes'
import { useDesign } from '@/hooks/web/useDesign'
import { matchMenu } from '@/utils/menu'
import './style/index.scss'

export function LayoutMenu() {
  const { prefixCls } = useDesign('menu')
  const navigate = useNavigate()
  const location = useLocation()

  const [openKeys, setOpenKeys] = useState([]);

  const menuSortData = _.sortBy(layoutRoutes, (o) => o?.meta?.sortIndex || 0)
  const items = matchMenu(menuSortData)

  const getCurrentOpenKeys = (keys) => {
    const result: string[] = []
    const curKey = keys.find(key => openKeys.indexOf(key) === -1)
    const firstMenu = items.find(item => openKeys.includes(item.key))
    if (firstMenu && firstMenu.children) {
      firstMenu.children.forEach(item => {
        result.push(...[firstMenu.key, curKey])
      })
    } else {
      curKey && result.push(curKey)
    }
    console.log(result)
    return result
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(getCurrentOpenKeys(keys))
  }


  useEffect(() => {
    if (location.pathname === '/layout') {
      navigate('/layout/workspace/statistics')
    }
  })

  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

export default LayoutMenu
