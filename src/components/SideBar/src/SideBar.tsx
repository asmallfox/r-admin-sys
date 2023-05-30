import { Layout, theme } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { LayoutMenu } from '@/components/Menu'
import { ScrollBar } from '@/components/ScrollBar'
import logo from '@/assets/images/react.svg'

import { useAppSelector } from '@/hooks/web/useApp'

// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';

export function SideBar(props: { collapsed: boolean }) {
  const { prefixCls } = useDesign('sideBar')
  const { collapsed } = props

  const themeMode = useAppSelector((state) => state.appStore.darkMode)

  const data = theme.useToken()
  console.log(data, themeMode)

  return (
    <Layout.Sider
      className={prefixCls}
      collapsed={collapsed}
      width={210}
      collapsedWidth={40}
      theme={themeMode}
    >
      <div className={`${prefixCls}-logo`}>
        <img src={logo} />
        {!collapsed && <span>Management System</span>}
      </div>

      <div style={{ height: 'calc(100% - 48px)' }}>
        {/* <SimpleBar  style={{ maxHeight: '100%' }}>
          <LayoutMenu collapsed={collapsed} />
        </SimpleBar> */}
        <ScrollBar color="rgba(255, 255, 255, 0.3)">
          <LayoutMenu collapsed={collapsed} />
        </ScrollBar>
      </div>
    </Layout.Sider>
  )
}

export default SideBar
