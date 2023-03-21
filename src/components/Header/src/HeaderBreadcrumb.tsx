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
  const [breadcrumbItems, setBreadcrumbItems] = useState([])

  const aaa = (e) => {
    console.log('aaaa', e)
  }

  const itemRender = (item) => {
    return (<span onClick={() => aaa(item)}>{item.title}</span>)
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
        <Breadcrumb items={breadcrumbItems} itemRender={itemRender} />
      </div>
    </div>
  )
}
export default HeaderBreadcrumb
