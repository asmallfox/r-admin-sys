import { useState } from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import { SideBar } from '@/components/SideBar'
import { LayoutHeader } from '@/components/Header'
import { useDesign } from '@/hooks/web/useDesign'

function AppLayout() {
  const { prefixCls } = useDesign('layout')
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Layout className={prefixCls}>
      <SideBar collapsed={collapsed}></SideBar>
      <Layout className={`${prefixCls}-site`}>
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
