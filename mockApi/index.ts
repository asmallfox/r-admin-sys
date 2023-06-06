import { createMock } from './utils'
import user from '../mock/sys/user'
import menu from '../mock/sys/menu'
import todoList from '../mock/demo/todoList'

export function setupMock() {
  const VITE_USE_MOCK = import.meta.env.VITE_USE_MOCK
  if (!VITE_USE_MOCK) return
  
  return [...createMock(user), ...createMock(menu), ...createMock(todoList)]
}
