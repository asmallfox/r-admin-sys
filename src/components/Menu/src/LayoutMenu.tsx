import type { MenuItem } from '@/router/routes/types'

import type { MenuProps } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd'

import { getMenus, getRouteMapItem, pathSnippets, joinPath } from '@/router/help/menuHelp'
import { useDesign } from '@/hooks/web/useDesign'
import { setTags } from '@/store/modules/menu'
import { RootState } from '@/store'
import './style/index.scss'

type itemType = MenuProps['items']

export function LayoutMenu(props: { collapsed: boolean }) {
  const { prefixCls } = useDesign('menu')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const routeParams = useParams()
  const { menuList } = useSelector((state: RootState) => state.menuReducer)

  const pathSplits = pathSnippets(location.pathname)
  const [selectKey, setSelectKey] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const menus = getMenus(menuList)
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
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? getOpenKeys(menus, latestOpenKey) : [])
  }

  const onSelect: MenuProps['onSelect'] = ({ keyPath }) => {
    const routePath = joinPath(keyPath.reverse())
    navigate(routePath)
  }

  useEffect(() => {
    const curMenuItem = getRouteMapItem(location.pathname, menus)
    if (!curMenuItem?.children?.length) {
      const label = Object.keys(routeParams).length
        ? `${curMenuItem.label}：${routeParams.id}`
        : curMenuItem.label
      
      dispatch(
        setTags({
          label,
          path: curMenuItem.path
        })
      )
    }
    setOpenKeys(pathSplits)
    const curSelectKeys = curMenuItem.active_menu
      ? pathSnippets(curMenuItem.active_menu).slice(-1)
      : pathSplits.slice(-1)
    setSelectKey(curSelectKeys)
  }, [props, location])

  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        inlineIndent={12}
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
