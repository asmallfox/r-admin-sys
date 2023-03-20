import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

import { getBreadcrumb } from '@/router/menu'
import { useDesign } from '@/hooks/web/useDesign'

interface Props {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

function HeaderBreadcrumb(props: Props) {
  const { prefixCls } = useDesign('header-bread')
  const { collapsed, setCollapsed } = props
  const location = useLocation()
  const [breadcrumbItems, setBreadcrumbItems] = useState([])

  useEffect(() => {
    setBreadcrumbItems(getBreadcrumb(location.pathname))
  }, [location])

  return <div className={`${prefixCls} flex items-center px-3`}>
    {React.createElement(
      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
      {
        className: "trigger mr-3",
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