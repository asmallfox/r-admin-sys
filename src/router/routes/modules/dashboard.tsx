import type { RouterRaws } from '../types'

import { Navigate } from 'react-router-dom'
import { AppstoreOutlined } from '@ant-design/icons'
import Analysis from '@/views/layout//dashboard/analysis'
import Workspace from '@/views/layout/dashboard/workspace'

export const Dashboard: RouterRaws = {
  path: '/dashboard',
  meta: {
    label: '工作台',
    icon: <AppstoreOutlined />,
    sortIndex: 0
  },
  children: [
    {
      path: 'analysis',
      element: <Analysis />,
      meta: {
        label: '表盘仪'
      }
    },
    {
      path: 'workspace',
      element: <Workspace />,
      meta: {
        label: '统计'
      }
    }
  ]
}

export default Dashboard
