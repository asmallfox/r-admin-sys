import { AppstoreOutlined } from '@ant-design/icons'
import Statistics from '@/views/layout/workspace/statistics'

export const Workspace = {
  path: 'workspace',
  meta: {
    label: '工作台',
    icon: <AppstoreOutlined />,
    sortIndex: 0
  },
  children: [
    {
      path: 'statistics',
      element: <Statistics />,
      meta: {
        label: '统计'
      }
    },
  ]
}

export default Workspace
