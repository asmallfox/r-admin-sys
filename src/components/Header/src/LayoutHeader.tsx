import { Layout, theme } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import HeaderTag from './HeaderTag'
import HeaderBreadcrumb from './HeaderBreadcrumb'
import HeaderMenu from './HeaderMenu'
import '../styles/index.scss'

interface Props {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

export default function LayoutHeader(props: Props) {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { collapsed, setCollapsed } = props

  const { prefixCls } = useDesign('header')

  return (
    <Layout.Header
      className={prefixCls}
      style={{ padding: 0, background: colorBgContainer }}
    >
      <div>
        <div
          className="flex justify-between items-center flex-nowrap"
          style={{ height: '42px' }}
        >
          <HeaderBreadcrumb collapsed={collapsed} setCollapsed={setCollapsed} />
          <HeaderMenu />
        </div>
        <HeaderTag />
      </div>
    </Layout.Header>
  )
}
