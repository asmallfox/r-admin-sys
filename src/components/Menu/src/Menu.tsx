import { Menu, theme } from 'antd'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useDesign } from '@/hooks/web/useDesign'
import './style/index.scss'

export function LayoutMenu() {
  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'nav 1',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ]
  const { prefixCls } = useDesign('menu')
  return (
    <div className={prefixCls}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </div>
  )
}

export default LayoutMenu
