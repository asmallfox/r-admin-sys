import type { MenuProps } from 'antd'
import type { MenuItem } from '@/router/routes/types'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDesign } from '@/hooks/web/useDesign'

import {
  getMenus,
  joinPath,
  getRouteMapItem,
  pathSnippets
} from '@/router/menu'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTags } from '@/store/modules/menu'

function LayoutMenu() {
  const { prefixCls } = useDesign('layout-menu')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const menuItems = getMenus()

  const paths = pathname.split('/')
  const currentPath = paths.slice(-1)
  const [selectedKey, setSelectedKey] = useState<string[]>(currentPath)
  const [openKey, setOpenKey] = useState<string[]>(paths)

  const menuSelect: MenuProps['onSelect'] = ({
    key,
    keyPath,
    selectedKeys
  }) => {
    const path = joinPath(keyPath.reverse())
    // setSelectedKey(selectedKeys)
    setOpenKey(keyPath.filter((v) => key !== v))
    const curMenuItem = getRouteMapItem(pathname)
    if (!curMenuItem?.children?.length) {
      dispatch(
        setTags({
          label: curMenuItem.label,
          path: curMenuItem.path
        })
      )
    }
    navigate(path)
  }

  const menuOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKey.indexOf(key) === -1)
    setOpenKey(latestOpenKey ? getOpenKeys(menuItems, latestOpenKey) : [])
  }

  const getOpenKeys = (
    menus: MenuItem[],
    key: string,
    result: string[] = []
  ) => {
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

  useEffect(() => {
    console.log('useEffect 触发')
    setSelectedKey(currentPath)
  }, [pathname])

  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        inlineIndent={12}
        items={menuItems}
        openKeys={openKey}
        selectedKeys={selectedKey}
        onSelect={menuSelect}
        onOpenChange={menuOpenChange}
      />
    </div>
  )
}

export default LayoutMenu
