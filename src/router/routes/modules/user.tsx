import { UserOutlined, AuditOutlined } from '@ant-design/icons'
import User from '@/views/layout/user/user'

export const UserLayout = {
  path: 'user',
  element: <User />,
  meta: {
    label: '用户管理',
    icon: <AuditOutlined />,
    sortIndex: 1
  },
  children: [
    {
      path: 'administrator',
      element: <User />,
      meta: {
        label: '管理员',
        icon: <UserOutlined />
      },
      children: [
        {
          path: 'super-admin',
          element: <User />,
          meta: {
            label: '系统管理员',
          },
        },
        {
          path: 'site-admin',
          element: <User />,
          meta: {
            label: '站点管理员',
          },
        },
      ],
    },
    {
      path: 'consumer',
      element: <User />,
      meta: {
        label: '普通用户',
      }
    }
  ],
}

export default UserLayout
