import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { LayoutMenu } from '@/components/Menu'
import './style/index.scss'

export function SideBar(props: { collapsed: boolean }) {
  const { prefixCls } = useDesign('sideBar')
  const { collapsed } = props
  return (
    <Layout.Sider className={prefixCls} collapsed={collapsed}>
      <div className={`${prefixCls}-logo`}>
        <img src="../../../assets/react.svg" alt="logo" />
        { !collapsed && <span >React Admin</span> }
      </div>
      <LayoutMenu></LayoutMenu>
    </Layout.Sider>
  )
}

export default SideBar
