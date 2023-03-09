import { Menu, theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDesign } from '@/hooks/web/useDesign'
import { matchMenu } from '@/utils/menu'
import './style/index.scss'

import { layoutRoutes } from '@/router/routes'
import _ from 'lodash'

import type { MenuProps } from 'antd'

export function LayoutMenu() {
  const navigate = useNavigate()
  const { prefixCls } = useDesign('menu')

  const menuSortData = _.sortBy(layoutRoutes, (o) => o?.meta?.sortIndex || 0)
  const items = matchMenu(menuSortData)

  const handleMenu: MenuProps['onClick'] = (e) => {
    const { keyPath } = e
    const path = keyPath.reverse().join('/')
    navigate(path)
  }
  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/layout']}
        items={items}
        onClick={handleMenu}
      />
    </div>
  )
}

export default LayoutMenu
