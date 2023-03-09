import { UserOutlined } from '@ant-design/icons'
import User from '@/views/user/user'

export const Layout = {
  path: '/user',
  element: <User />,
  meta: {
    label: '用户管理',
    icon: <UserOutlined />,
    sortIndex: 1
  },
  children: [
    {
      path: 'user1',
      element: <User />,
      meta: {
        label: '用户管理',
        icon: <UserOutlined />,
      },
      children: [
        {
          path: 'user11',
          element: <User />,
          meta: {
            label: '用户管理',
            icon: <UserOutlined />,
          },
        },
      ],
    },
    {
      path: 'user2',
      element: <User />,
      meta: {
        label: '用户管理',
        icon: <UserOutlined />,
      },
      children: [
        {
          path: 'user21',
          element: <User />,
          meta: {
            label: '用户管理',
            icon: <UserOutlined />,
          },
        },
      ],
    }
  ],
}

export default Layout
