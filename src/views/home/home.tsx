import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { LayoutSider } from '@/components/Sider'
import { LayoutHeader } from '@/components/Header'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout

function Home() {
  const [collapsed, setCollapsed] = useState(false)


  return (
    <Layout>
      <LayoutSider collapsed={collapsed}></LayoutSider>
      <Layout className="site-layout">
        <LayoutHeader></LayoutHeader>
        {/* <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content> */}
      </Layout>
    </Layout>
  )
}

export default Home
