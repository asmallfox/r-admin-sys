import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { LayoutMenu } from '@/components/Menu'
import './style/index.scss'

import logo from '@/assets/images/react.svg'

export function SideBar(props: { collapsed: boolean }) {
  const { prefixCls } = useDesign('sideBar')
  const { collapsed } = props
  return (
    <Layout.Sider className={prefixCls} collapsed={collapsed}>
      <div className={`${prefixCls}-logo`}>
        {/* <img src={logo} /> */}
        {!collapsed && <span>Management System</span>}
      </div>
      <LayoutMenu collapsed={collapsed} />
    </Layout.Sider>
  )
}

export default SideBar
