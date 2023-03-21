import { Layout, theme, Divider } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import HeaderTag from './HeaderTag'
import HeaderBreadcrumb from './HeaderBreadcrumb'
import HeaderMenu from './HeaderMenu'
import './style/index.scss'

interface Props {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

export function LayoutHeader(props: Props) {
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
      <div className="flex justify-between items-center flex-nowrap" style={{ height: '48px', width: '100%' }}>
        <HeaderBreadcrumb collapsed={collapsed} setCollapsed={setCollapsed} />
        <HeaderMenu />
      </div>
      <div>
        <Divider style={{ margin: 0 }} />
        <HeaderTag />
        <Divider style={{ margin: 0 }} />
      </div>
    </Layout.Header>
  )
}

export default LayoutHeader
