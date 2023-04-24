import type { RouterRaws } from '../types'

import { Navigate } from 'react-router-dom'
import { UserOutlined, AuditOutlined } from '@ant-design/icons'
import User from '@/views/layout/user/user'
import SysAdmin from '@/views/layout/user/sysAdmin'

export const UserLayout: RouterRaws[] = [
  {
    path: '/user',
    element: <Navigate to="super-admin" />,
    meta: {
      menuHidden: true
    }
  },
  {
    path: '/user',
    redirect: '/user/administrator/super-admin',
    meta: {
      title: '用户管理',
      icon: <AuditOutlined />,
      sortIndex: 1
    },
    children: [
      {
        path: 'administrator',
        element: <Navigate to="super-admin" />,
        meta: {
          menuHidden: true
        }
      },
      {
        path: 'administrator',
        redirect: '/user/administrator/super-admin',
        meta: {
          title: '管理员',
          icon: <UserOutlined />
        },
        children: [
          {
            path: 'super-admin',
            element: <SysAdmin />,
            meta: {
              title: '系统管理员'
            }
          },
          {
            path: 'site-admin',
            element: <User />,
            meta: {
              title: '站点管理员'
            }
          }
        ]
      },
      {
        path: 'consumer',
        redirect: '/user/consumer/consumer-1',
        element: <User />,
        meta: {
          title: '普通用户',
          icon: <UserOutlined />
        },
        children: [
          {
            path: 'consumer-1',
            element: <User />,
            meta: {
              title: 'test1'
            }
          },
          { path: 'consumer-2', element: <User />, meta: { title: 'test2' } }
        ]
      }
    ]
  }
]

export default UserLayout
