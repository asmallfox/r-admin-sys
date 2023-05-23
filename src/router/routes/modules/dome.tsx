import type { RouterRaws } from '../../types'

import { DeploymentUnitOutlined } from '@ant-design/icons'
import TodoList from '@/views/layout/demo/todo-list'
import PrintDemo from '@/views/layout/demo/print-dome'

export const DemoLayout: RouterRaws = {
  path: '/demo',
  redirect: '/demo/todo-list',
  meta: {
    title: 'Demo',
    icon: <DeploymentUnitOutlined />,
    sortIndex: 3
  },
  children: [
    {
      path: 'todo-list',
      element: <TodoList />,
      meta: {
        title: 'todoList'
      }
    },
    {
      path: 'print-dome',
      element: <PrintDemo />,
      meta: {
        title: 'PrintDome'
      }
    }
  ]
}

export default DemoLayout
