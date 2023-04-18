import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { LayoutMenu } from '@/components/Menu'
import { ScrollBar } from '@/components/ScrollBar'
import 'simplebar-react/dist/simplebar.min.css';
// import Simplebar from 'simplebar-react'
import './style/index.scss'

import logo from '@/assets/images/react.svg'

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
        {/* <Simplebar style={{ maxHeight: 200 }} forceVisible="y">
          <LayoutMenu collapsed={collapsed} />
        </Simplebar> */}
        <ScrollBar always={true}>
          <LayoutMenu collapsed={collapsed} />
        </ScrollBar>
      </div>
    </Layout.Sider>
  )
}

export default SideBar
