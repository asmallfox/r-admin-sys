import type { MenuProps } from 'antd'
import type { MenuItem } from '@/utils/menu'

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import { asyncRoutes } from '@/router/routes'
import { useDesign } from '@/hooks/web/useDesign'
import { matchMenu } from '@/utils/menu'
import './style/index.scss'

export function LayoutMenu() {
  const { prefixCls } = useDesign('menu')
  const navigate = useNavigate()
  const location = useLocation()

  const pathKeys = location.pathname.split('/').filter((v) => v) ?? []
  const currentKey = pathKeys.at(-1) ?? ''
  const [selectKey] = useState([currentKey])
  const [openKeys, setOpenKeys] = useState(pathKeys)

  const menus = matchMenu(asyncRoutes)

  const getOpenKeys = (menus: MenuItem[], key: string, result: string[] = []) => {
    const existsCurrentMenu = menus.find((item) => (item!).key === key)
    if (existsCurrentMenu) {
      result.push(key)
    } else {
      for (const menu of menus) {
        const { key: path, children } = menu
        if (children && children.length > 0) {
          const res = getOpenKeys(children, key, result)
          if (res.length > 0) {
            result.push(...res)
            result.push(path)
            return [...new Set(result)]
          }
        }
      }
    }
    return result
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? getOpenKeys(menus, latestOpenKey) : [])
  }

  const onSelect: MenuProps['onSelect'] = (evt) => {
    const { key, keyPath } = evt
    const keys = keyPath.filter((path) => key !== path)
    const routePath = keyPath.reverse().join('/')
    setOpenKeys(keys)
    console.log(evt, routePath)
    navigate(routePath)
  }

  useEffect(() => {
    if (currentKey === 'layout') {
      navigate('/layout/workspace/statistics')
    }
  })

  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        items={menus}
        defaultSelectedKeys={selectKey}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
      />
    </div>
  )
}

export default LayoutMenu
