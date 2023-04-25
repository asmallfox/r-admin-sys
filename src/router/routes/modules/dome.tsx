import type { RouterRaws } from '../types'

import { DeploymentUnitOutlined } from '@ant-design/icons'
import TodoList from '@/views/layout/demo/todo-list'

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
    }
  ]
}

export default DemoLayout
