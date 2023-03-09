import { useState } from 'react'
import { Layout, theme } from 'antd'
import { SideBar } from '@/components/SideBar'
import { LayoutHeader } from '@/components/Header'

function Home() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <SideBar collapsed={collapsed}></SideBar>
      <Layout className="site-layout">
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed}></LayoutHeader>
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Home
