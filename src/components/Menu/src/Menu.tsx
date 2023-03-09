import { Menu, theme } from 'antd'
import { useDesign } from '@/hooks/web/useDesign'
import { matchMenu } from '@/utils/menu'
import './style/index.scss'

import { layoutRoutes } from '@/router/routes'
import _ from 'lodash'

export function LayoutMenu() {
  const items = matchMenu(_.sortBy(layoutRoutes, ["sortIndex"]))

  const { prefixCls } = useDesign('menu')
  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </div>
  )
}

export default LayoutMenu
