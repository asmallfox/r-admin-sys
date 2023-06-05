import type { RouterRaws } from '../../types'

import Analysis from '@/views/layout/dashboard/analysis/analysis'
import Workspace from '@/views/layout/dashboard/workspace/workspace'

export const Dashboard: RouterRaws = {
  path: '/dashboard',
  redirect: '/dashboard/analysis',
  meta: {
    title: '工作台',
    icon: 'icon-dashboard',
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

export default Dashboard
