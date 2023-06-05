import type { MenuProps } from 'antd'
import type { MenuItem } from '@/router/types'
import type { ThemeMock } from '@/setting/designSetting'

import { Menu } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/web/useApp'

import {
  getMenus,
  getRouteMapItem,
  pathSnippets,
  joinPath
} from '@/router/help/menuHelp'
import { useDesign } from '@/hooks/web/useDesign'
import { setTags } from '@/store/modules/menu'
import { ThemeEnum } from '@/enums/themeEnum'

type itemType = MenuProps['items']

interface Props {
  collapsed?: boolean
  theme?: ThemeMock
}

export default function BasicMenu(props: Props) {
  const { theme = ThemeEnum.Dark } = props

  const { prefixCls } = useDesign('menu')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const routeParams = useParams()
  const { menuList, menuMode } = useAppSelector((state) => {
    return {
      menuList: state.menuStore.menuList,
      menuMode: state.appStore.projectConfig.menu.mode
    }
  })

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
        theme={theme}
        mode={menuMode}
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
