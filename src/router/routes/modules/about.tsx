import type { RouterRaws } from '../types'

import { QuestionCircleOutlined } from '@ant-design/icons'
import About from '@/views/layout/about/about'

export const AboutLayout: RouterRaws = {
  path: '/about',
  element: <About />,
  meta: {
    label: '关于',
    icon: <QuestionCircleOutlined />,
    sortIndex: 999
  },
}

export default AboutLayout
