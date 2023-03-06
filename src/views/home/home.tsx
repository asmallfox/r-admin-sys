import { useState } from 'react'
import { Layout, theme } from 'antd'
import { LayoutSider } from '@/components/Sider'
import { LayoutHeader } from '@/components/Header'

function Home() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <LayoutSider collapsed={collapsed}></LayoutSider>
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
