import type { RouterRaws } from '../../types'

import { RadarChartOutlined } from '@ant-design/icons'
import Three from '@/views/layout/three/three'

export const Dashboard: RouterRaws = {
  path: '/three',
  // redirect: '/dashboard/analysis',
  element: <Three />,
  meta: {
    title: 'Three',
    icon: <RadarChartOutlined />,
    sortIndex: 4,
    permission: ['TEST']
  }
}

export default Dashboard
