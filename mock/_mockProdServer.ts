import { createProdMockServer } from 'vite-plugin-mock/client'

import todoList from './demo/todoList'
import menu from './sys/menu'
import user from './sys/user'

export async function setupProdMockServer() {
  createProdMockServer([
    ...todoList,
    ...menu,
    ...user
  ])
}
