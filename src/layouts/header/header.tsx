import { Layout, theme } from 'antd'

import { useDesign } from '@/hooks/web/useDesign'
import { HeaderTag, HeaderBreadcrumb, HeaderMenu } from '@/components/Header'
import LayoutMenu from '@/layouts/menu'
import { useAppSelector } from '@/hooks/web/useApp'
import { MenuTypeEnum } from '@/enums/menuEnum'

import { AppLogo } from '@/components/AppLogo'

import './styles/index.scss'

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

  const { menuType, darkMode } = useAppSelector((state) => {
    return {
      menuType: state.appStore.projectConfig.menuType,
      darkMode: state.appStore.darkMode
    }
  })

  return (
    <Layout.Header
      className={prefixCls}
      style={{ padding: 0, background: colorBgContainer }}
    >
      {menuType === MenuTypeEnum.SIDEBAR_TOP ||
      menuType === MenuTypeEnum.SIDEBAR_MIX ? (
        <div className={`${prefixCls}-siderbar-top`}>
          <AppLogo />
          {menuType === MenuTypeEnum.SIDEBAR_TOP && (
            <LayoutMenu theme={darkMode} />
          )}
          <HeaderMenu className="ml-auto" />
        </div>
      ) : (
        <div
          className="flex justify-between items-center flex-nowrap"
          style={{ height: '42px' }}
        >
          <HeaderBreadcrumb collapsed={collapsed} setCollapsed={setCollapsed} />
          <HeaderMenu />
        </div>
      )}

      <HeaderTag />
    </Layout.Header>
  )
}
