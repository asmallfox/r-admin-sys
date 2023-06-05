import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import LayoutMenu from '@/layouts/menu'

import { AppLogo } from '@/components/AppLogo'
import { useAppSelector } from '@/hooks/web/useApp'
import { MenuTypeEnum } from '@/enums/menuEnum'

interface Props {
  collapsed: boolean
}

const SIDEBAR_WIDTH = 210
const COLLAPSED_WIDTH = 40

export default function SiderLayout(props: Props) {
  const { collapsed } = props
  const { prefixCls } = useDesign('sider')

  const menuType = useAppSelector(
    (state) => state.appStore.projectConfig.menuType
  )

  const showAppLogo = menuType === MenuTypeEnum.SIDEBAR

  const layoutMenuStyle = {
    height: `${showAppLogo ? 'calc(100% - 48px)' : '100%'}`
  }

  return (
    <Layout.Sider
      theme="dark"
      className={prefixCls}
      collapsed={collapsed}
      width={SIDEBAR_WIDTH}
      collapsedWidth={COLLAPSED_WIDTH}
    >
      {showAppLogo && <AppLogo collapsed={collapsed} />}

      <LayoutMenu style={layoutMenuStyle} />
    </Layout.Sider>
  )
}
