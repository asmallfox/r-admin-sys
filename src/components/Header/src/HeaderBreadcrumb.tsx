import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { getBreadcrumb } from '@/router/menu'
import { useDesign } from '@/hooks/web/useDesign'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

function HeaderBreadcrumb(props: Props) {
  const { prefixCls } = useDesign('header-bread')
  const location = useLocation()
  const navigate = useNavigate()
  const { collapsed, setCollapsed } = props

  const breadcrumbs = getBreadcrumb(location.pathname)

  const [breadcrumbItems, setBreadcrumbItems] = useState(breadcrumbs)

  const handleItemRender = (route: any) => {
    const { menu, path, title } = route
    const go = (e: React.MouseEvent) => {
      e?.preventDefault()
      if (menu?.items?.length) {
        if (location.pathname === path) return
        console.log(route.path)
        navigate(route.path)
      }
    }
    return <span onClick={go}>{title}</span>
  }

  useEffect(() => {
    setBreadcrumbItems(getBreadcrumb(location.pathname))
  }, [location])

  return (
    <div className={`${prefixCls} flex items-center px-3`}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger mr-3',
        onClick: () => setCollapsed(!collapsed)
      })}
      <div className="header-bread">
        <Breadcrumb items={breadcrumbItems} itemRender={handleItemRender} />
      </div>
    </div>
  )
}
export default HeaderBreadcrumb
