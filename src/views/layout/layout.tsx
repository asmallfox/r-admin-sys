import { useState } from 'react'
import { Layout } from 'antd'
// import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import { SideBar } from '@/components/SideBar'
import { LayoutHeader } from '@/components/Header'
import { useDesign } from '@/hooks/web/useDesign'

import "./style/layout.scss"

function AppLayout() {
  const { prefixCls } = useDesign('layout')
  const [collapsed, setCollapsed] = useState(false)
  // const {
  //   token: { colorBgContainer }
  // } = theme.useToken()
  return (
    <Layout className={prefixCls}>
      <SideBar collapsed={collapsed} />
      <Layout className={`${prefixCls}-site`} style={{ background: '#f0f2f5' }}>
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className={`${prefixCls}-site_content p-4 overflow-x-hidden`}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
