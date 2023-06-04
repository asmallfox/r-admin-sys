import { useState } from 'react'
import { Layout } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { useAppSelector } from '@/hooks/web/useApp'
import { MenuTypeEnum } from '@/enums/menuEnum'

import LayoutHeader from './header/header'
import SiderLayout from './sider/sider'
import LayoutContent from './content/content'
import { Tabs } from '@/components/Tabs'

import './styles/index.scss'

export default function AppLayout() {
  const { prefixCls } = useDesign('layout')
  const [collapsed, setCollapsed] = useState(false)

  const menuType = useAppSelector(
    (state) => state.appStore.projectConfig.menuType
  )

  const isSidebar = menuType === MenuTypeEnum.SIDEBAR
  const isSidebarTop = menuType === MenuTypeEnum.SIDEBAR_TOP
  const isSidebarMix = menuType === MenuTypeEnum.SIDEBAR_MIX

  return (
    <Layout className={prefixCls}>
      {(isSidebarTop || isSidebarMix) && (
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
      <Layout>
        {!isSidebarTop && <SiderLayout collapsed={collapsed} />}
        <Layout>
          {isSidebar && (
            <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          )}
          {isSidebarMix && <Tabs />}
          <LayoutContent />
        </Layout>
      </Layout>
    </Layout>
  )
}
