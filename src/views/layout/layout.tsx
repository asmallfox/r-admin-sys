import { useState } from 'react'
import { Layout, theme } from 'antd'
import { useOutlet, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { SideBar } from '@/components/SideBar'
import { LayoutHeader } from '@/components/Header'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollBar } from '@/components/ScrollBar'

import './style/layout.scss'

function AppLayout() {
  const { prefixCls } = useDesign('layout')
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const currentOutlet = useOutlet()
  // const {
  //   token: { colorBgContainer }
  // } = theme.useToken()

  return (
    <Layout className={prefixCls}>
      <SideBar collapsed={collapsed} />
      <Layout className={`${prefixCls}-site`} style={{ background: '#f0f2f5' }}>
        <LayoutHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="flex-auto h-full">
          <ScrollBar always>
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                timeout={300}
                unmountOnExit
                classNames={`${prefixCls}-content`}
              >
                {(state) => (
                  <div className={`${prefixCls}-content`}>{currentOutlet}</div>
                )}
              </CSSTransition>
            </SwitchTransition>
          </ScrollBar>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
