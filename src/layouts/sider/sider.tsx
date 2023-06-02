import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import LayoutMenu from '@/layouts/menu'
import { ScrollBar } from '@/components/ScrollBar'

import logo from '@/assets/images/react.svg'
import { AppLogo } from '@/components/AppLogo'
import { useAppSelector } from '@/hooks/web/useApp'
import { MenuTypeEnum } from '@/enums/menuEnum'

interface Props {
  collapsed: boolean
}

const SIDER_WIDTH = 210
const COLLAPSED_WIDTH = 40

export default function SiderLayout(props: Props) {
  const { collapsed } = props
  const { prefixCls } = useDesign('sider')

  const menuType = useAppSelector(
    (state) => state.appStore.projectConfig.menuType
  )

  return (
    <Layout.Sider
      theme="dark"
      className={prefixCls}
      collapsed={collapsed}
      width={SIDER_WIDTH}
      collapsedWidth={COLLAPSED_WIDTH}
    >
      {menuType === MenuTypeEnum.SIDEBAR && <AppLogo collapsed={collapsed} />}

      <div className="flex-1">
        <ScrollBar color="rgba(255, 255, 255, 0.3)">
          <LayoutMenu collapsed={collapsed} />
        </ScrollBar>
      </div>
    </Layout.Sider>
  )
}
