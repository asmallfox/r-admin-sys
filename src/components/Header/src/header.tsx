import React from 'react'
import { Layout, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface Props {
  collapsed: boolean;
  setCollapsed: (bool: boolean) => void
}

export function LayoutHeader(props: Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { collapsed, setCollapsed } = props

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
