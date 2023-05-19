import type { RouterRaws } from '../types'
import { PermissionEnum } from '@/enums/menuEnum'

import { UserOutlined, AuditOutlined } from '@ant-design/icons'
import User from '@/views/layout/user/user'
import SysAdmin from '@/views/layout/user/sysAdmin/sysAdmin'
import Ordinary from '@/views/layout/user/ordinary/ordinary'
import UserDetail from '@/views/layout/user/userDetail/userDetail'

export const UserLayout: RouterRaws = {
  path: '/user',
  redirect: '/user/administrator/super-admin',
  meta: {
    title: '用户管理',
    icon: <AuditOutlined />,
    sortIndex: 1
  },
  children: [
    {
      path: 'admin',
      element: <SysAdmin />,
      meta: {
        title: '系统管理员',
        permission: [PermissionEnum.ADMIN]
      }
    },
    {
      path: 'ordinary-user',
      element: <Ordinary />,
      meta: {
        title: '普通用户'
      }
    },
    {
      path: 'admin_detail/:id',
      element: <UserDetail />,
      meta: {
        title: '用户详情',
        icon: <UserOutlined />,
        menuHidden: true,
        activeMenu: '/user/administrator/super-admin'
      }
    },
    {
      path: 'consumer',
      redirect: '/user/consumer/consumer-1',
      element: <User />,
      meta: {
        title: 'Test',
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

export default UserLayout
