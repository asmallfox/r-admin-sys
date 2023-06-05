import type { RouterRaws } from '../../types'

import LargeScreen from '@/views/layout/echart/largeScreen/largeScreen'
import LayoutEcharts from '@/views/layout/echart/layoutEcharts'

export const LargeScreenLayout: RouterRaws = {
  path: '/echart',
  element: <LayoutEcharts />,
  meta: {
    title: 'echart',
    icon: 'icon-line-chart',
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
