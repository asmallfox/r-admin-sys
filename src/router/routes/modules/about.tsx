import type { RouterRaws } from '../../types'

import About from '@/views/layout/about/about'

export const AboutLayout: RouterRaws = {
  path: '/about',
  element: <About />,
  meta: {
    title: '关于',
    icon: 'icon-about',
    sortIndex: 999
  },
}

export default AboutLayout
