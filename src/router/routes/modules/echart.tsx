import type { RouterRaws } from '../types'

import { QuestionCircleOutlined } from '@ant-design/icons'
import LargeScreen from '@/views/layout/echart/LargeScreen/LargeScreen'

export const LargeScreenLayout: RouterRaws = {
  path: '/echart',
  meta: {
    title: 'echart',
    icon: <QuestionCircleOutlined />,
    sortIndex: 3
  },
  children: [
    {
      path: 'large-screen',
      element: <LargeScreen />,
      meta: {
        title: '可视化大屏'
      }
    }
  ]
}

export default LargeScreenLayout
