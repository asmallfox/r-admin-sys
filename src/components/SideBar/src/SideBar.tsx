import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { LayoutMenu } from '@/components/Menu'
import { ScrollBar } from '@/components/ScrollBar'

import logo from '@/assets/images/react.svg'

// import SimpleBar from 'simplebar-react';
// import 'simplebar-react/dist/simplebar.min.css';


export function SideBar(props: { collapsed: boolean }) {
  const { prefixCls } = useDesign('sideBar')
  const { collapsed } = props

  return (
    <Layout.Sider
      className={prefixCls}
      collapsed={collapsed}
      width={210}
      collapsedWidth={40}
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
