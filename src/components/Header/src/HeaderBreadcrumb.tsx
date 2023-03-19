import React from 'react'
import { Breadcrumb } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

import { getBreadcrumb } from '@/router/menu'

interface Props {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

function HeaderBreadcrumb(props: Props) {
  const { collapsed, setCollapsed } = props
  const breadcrumbItems = getBreadcrumb(location.pathname)

  return <div className="flex items-center ">
    {React.createElement(
      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
      {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed)
      }
    )}
    <div className="header-bread">
      <Breadcrumb
        items={breadcrumbItems}
      />
    </div>
  </div>
}
export default HeaderBreadcrumb