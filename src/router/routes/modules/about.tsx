import { QuestionCircleOutlined } from '@ant-design/icons'
import AboutLayout from '@/views/about/about'

export const About = {
  path: '/about',
  element: <AboutLayout />,
  meta: {
    label: '关于',
    icon: <QuestionCircleOutlined />,
    sortIndex: 999
  },
}

export default About
