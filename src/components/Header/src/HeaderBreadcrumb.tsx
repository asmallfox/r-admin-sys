import type { IBreadcrumb } from '@/router/help/menuHelp'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { getBreadcrumb, getMenus } from '@/router/help/menuHelp'
import { RootState } from '@/store'
import { useDesign } from '@/hooks/web/useDesign'

interface Props {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

function HeaderBreadcrumb(props: Props) {
  const { collapsed, setCollapsed } = props

  const { prefixCls } = useDesign('header-bread')
  const location = useLocation()
  const navigate = useNavigate()
  const { menuList } = useSelector((state: RootState) => state.menuReducer)

  const [breadcrumbItems, setBreadcrumbItems] = useState<IBreadcrumb[]>([])

  const handleItemRender = (route: any) => {
    const { menu, path, title } = route
    const go = (e: React.MouseEvent) => {
      e?.preventDefault()
      if (menu?.items?.length) {
        if (location.pathname === path) return
        navigate(route.menu?.items[0]?.path || route.path)
      }
    }
    return <span onClick={go}>{title}</span>
  }

  useEffect(() => {
    const breadcrumbs = getBreadcrumb(location.pathname, getMenus(menuList))
    setBreadcrumbItems(breadcrumbs)
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
