import type { MenuProps } from 'antd'

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
  theme?: 'light' | 'dark'
}

export default function MenuLayout(props: Props) {

  const { theme = ThemeEnum.Dark } = props

  const { prefixCls } = useDesign('menu')
  const navigate = useNavigate()
  const location = useLocation()
  const routeParams = useParams()
  const dispatch = useAppDispatch()
  const { menuList, menuMode } = useAppSelector((state) => {
    return {
      menuList: state.menuStore.menuList,
      menuMode: state.appStore.projectConfig.menu.mode
    }
  })

  const pathSplits = pathSnippets(location.pathname)
  const [selectKey, setSelectKey] = useState<string[]>([])

  const menus = getMenus(menuList)

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
        onSelect={onSelect}
      />
    </div>
  )
}
