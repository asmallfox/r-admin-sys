import type { MenuProps } from 'antd'
import type { MenuItem } from '@/router/routes/types'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDesign } from '@/hooks/web/useDesign'

import { getMenus, joinPath } from '@/router/menu'
import { useState } from 'react'

function LayoutMenu() {
  const { prefixCls } = useDesign('layout-menu')

  const navigate = useNavigate()

  const menuItems = getMenus()

  const [openKey, setOpenKey] = useState<string[]>([])

  const menuSelect: MenuProps['onSelect'] = ({
    key,
    keyPath,
    selectedKeys
  }) => {
    const path = joinPath(keyPath.reverse())
    navigate(path)
  }

  const menuOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find(key => openKey.indexOf(key) === -1)
    setOpenKey(latestOpenKey ? getOpenKeys(menuItems, latestOpenKey) : [])
  }

  const getOpenKeys = (menus: MenuItem[], key: string, result: string[] = []) => {
    const existsCurrentMenu = menus.find((item) => item.key === key)
    if (existsCurrentMenu) {
      result.push(key)
    } else {
      for (const menu of menus) {
        const { key: path, children } = menu
        if (children && children.length > 0) {
          const res = getOpenKeys(children, key, result)
          if (res.length > 0) {
            result.push(...res, path as string)
            return [...new Set(result)]
          }
        }
      }
    }
    return result
  }

  console.log('====', menuItems)

  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        items={menuItems}
        openKeys={openKey}
        onSelect={menuSelect}
        onOpenChange={menuOpenChange}
      />
    </div>
  )
}

export default LayoutMenu
