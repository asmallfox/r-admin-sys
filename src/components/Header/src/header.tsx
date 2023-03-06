import React, { useState } from 'react'
import { Layout, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export function LayoutHeader(props: { collapsed: boolean }) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
    </Layout.Header>
  )
}

export default LayoutHeader
