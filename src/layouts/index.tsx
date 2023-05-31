import { useState } from 'react'
import { Layout } from 'antd'
import { useOutlet } from 'react-router-dom'

import { LayoutHeader } from '@/components/Header'
import { useDesign } from '@/hooks/web/useDesign'
import { ScrollBar } from '@/components/ScrollBar'

import { Transition } from '@/components/Transition'
import SiderLayout from './sider/sider'

import './styles/index.scss'

export default function AppLayout() {
  const { prefixCls } = useDesign('layout')
  const [collapsed, setCollapsed] = useState(false)
  const currentOutlet = useOutlet()

  return (
    <Layout className={prefixCls}>
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
    </Layout>
  )
}
