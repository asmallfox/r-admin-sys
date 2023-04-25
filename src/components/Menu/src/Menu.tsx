import type { MenuProps } from 'antd'
import { joinPath } from '@/router/menu'

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Menu } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { getRouteMapItem, getMenus, pathSnippets } from '@/router/menu'
import { setTags } from '@/store/modules/menu'
import './style/index.scss'
import { MenuItem } from '@/router/routes/types'

type itemType = MenuProps['items']

export function LayoutMenu(props: { collapsed: boolean }) {
  const { prefixCls } = useDesign('menu')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const pathSplits = pathSnippets(location.pathname)
  const [selectKey, setSelectKey] = useState(pathSplits.slice(-1))
  const [openKeys, setOpenKeys] = useState(pathSplits)

  const menus = getMenus()

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
            result.push(...res)
            result.push(path as string)
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
    const routePath = joinPath(keyPath.reverse())
    setOpenKeys(keys)
    navigate(routePath)
  }

  useEffect(() => {
    setOpenKeys(pathSplits)
    if (selectKey[0] !== pathSplits.at(-1)) {
      setSelectKey(pathSplits.slice(-1))
    }
    const routeMapItem = getRouteMapItem(location.pathname)
    if (!routeMapItem?.children?.length) {
      console.log('===', routeMapItem)
      dispatch(
        setTags({
          label: routeMapItem.label,
          path: routeMapItem.path
        })
      )
    }
  }, [props, location])
  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        items={menus as itemType}
        selectedKeys={selectKey}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
      />
    </div>
  )
}

export default LayoutMenu
