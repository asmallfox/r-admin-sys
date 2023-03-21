import type { RouterRaws } from '../types'

import { Navigate } from 'react-router-dom'
import { AppstoreOutlined } from '@ant-design/icons'
import Analysis from '@/views/layout//dashboard/analysis'
import Workspace from '@/views/layout/dashboard/workspace'

export const Dashboard: RouterRaws[] = [
  {
    path: '/dashboard',
    element: <Navigate to="analysis" />,
    meta: {
      menuHidden: true
    }
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    meta: {
      title: '工作台',
      icon: <AppstoreOutlined />,
      sortIndex: 0
    },
    children: [
      {
        path: 'analysis',
        element: <Analysis />,
        meta: {
          title: '表盘仪'
        }
      },
      {
        path: 'workspace',
        element: <Workspace />,
        meta: {
          title: '统计'
        }
      }
    ]
  }
]

export default Dashboard
