import { createProdMockServer } from 'vite-plugin-mock/client'

import todoList from '../modules/todoList'
import menu from '../modules/menu'
import user from '../modules/user'

export async function setupProdMockServer() {
  createProdMockServer([
    ...todoList(),
    ...menu(),
    ...user()
  ])
}
