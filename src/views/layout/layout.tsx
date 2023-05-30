import { useState } from 'react'
import { Layout, theme } from 'antd'
import { useOutlet } from 'react-router-dom'

import { SideBar } from '@/components/SideBar'
import { LayoutHeader } from '@/components/Header'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollBar } from '@/components/ScrollBar'

import { Transition } from '@/components/Transition'

import './styles/layout.scss'

function AppLayout() {
  const { prefixCls } = useDesign('layout')
  const [collapsed, setCollapsed] = useState(false)
  const currentOutlet = useOutlet()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout className={prefixCls}>
      <SideBar collapsed={collapsed} />
      <Layout className={`${prefixCls}-site`}>
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content
          className="flex-auto"
          style={{ background: colorBgContainer }}
        >
          <Transition>
            <ScrollBar always>
              <>{currentOutlet}</>
            </ScrollBar>
          </Transition>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
