import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { LayoutMenu } from '@/components/Menu'
import { ScrollBar } from '@/components/ScrollBar'

import logo from '@/assets/images/react.svg'

interface Props {
  collapsed: boolean
}

const SIDER_WIDTH = 210
const COLLAPSED_WIDTH = 40

export default function SiderLayout(props: Props) {
  const { collapsed } = props
  const { prefixCls } = useDesign('sider')

  return (
    <Layout.Sider
      theme="dark"
      className={prefixCls}
      collapsed={collapsed}
      width={SIDER_WIDTH}
      collapsedWidth={COLLAPSED_WIDTH}
    >
      <div className={`${prefixCls}-logo`}>
        <img src={logo} />
        {!collapsed && <span>Management System</span>}
      </div>

      <div style={{ height: 'calc(100% - 48px)' }}>
        <ScrollBar color="rgba(255, 255, 255, 0.3)">
          <LayoutMenu collapsed={collapsed} />
        </ScrollBar>
      </div>
    </Layout.Sider>
  )
}
