import { useState } from 'react'
import { Layout } from 'antd'
import { useOutlet } from 'react-router-dom'

import LayoutHeader from './header/header'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollBar } from '@/components/ScrollBar'

import { Transition } from '@/components/Transition'
import SiderLayout from './sider/sider'

import './styles/index.scss'
import { useAppSelector } from '@/hooks/web/useApp'
import { MenuTypeEnum } from '@/enums/menuEnum'

export default function AppLayout() {
  const { prefixCls } = useDesign('layout')
  const [collapsed, setCollapsed] = useState(false)
  const currentOutlet = useOutlet()

  const menuType = useAppSelector(
    (state) => state.appStore.projectConfig.menuType
  )

  return (
    <Layout className={prefixCls}>
      {/* {(menuType === MenuTypeEnum.SIDEBAR ||
        menuType === MenuTypeEnum.SIDEBAR_MIX) && (
        <SiderLayout collapsed={collapsed} />
      )} */}

      {/* <Layout>
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="flex-auto">
          <Transition>
            <ScrollBar always>
              <>{currentOutlet}</>
            </ScrollBar>
          </Transition>
        </Layout.Content>
      </Layout> */}
      {/* 默认 侧边导航 */}
      {menuType === MenuTypeEnum.SIDEBAR && (
        <>
          <SiderLayout collapsed={collapsed} />
          <Layout>
            <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout.Content className="flex-auto">
              <Transition>
                <ScrollBar always>
                  <>{currentOutlet}</>
                </ScrollBar>
              </Transition>
            </Layout.Content>
          </Layout>
        </>
      )}
      {/* 顶部导航 */}
      {menuType === MenuTypeEnum.SIDEBAR_TOP && (
        <Layout>
          <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout.Content className="flex-auto">
            <Transition>
              <ScrollBar always>
                <>{currentOutlet}</>
              </ScrollBar>
            </Transition>
          </Layout.Content>
        </Layout>
      )}
      {/* 侧边导航，顶部header */}
      {menuType === MenuTypeEnum.SIDEBAR_MIX && (
        <>
          <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout>
            <SiderLayout collapsed={collapsed} />
            <Layout.Content className="flex-auto">
              <Transition>
                <ScrollBar always>
                  <>{currentOutlet}</>
                </ScrollBar>
              </Transition>
            </Layout.Content>
          </Layout>
        </>
      )}
    </Layout>
  )
}
