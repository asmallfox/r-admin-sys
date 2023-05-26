import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import todoList from './demo/todoList'
import menu from './sys/menu'
import user from './sys/user'

export function setupProdMockServer() {
  createProdMockServer([
    ...todoList,
    ...menu,
    ...user
  ])
}