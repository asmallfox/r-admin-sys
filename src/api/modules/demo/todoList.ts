import { defHttp } from '@/utils/http/axios'

enum Api {
 TodoList = '/todo-list'
}

export function getTodoListApi() {
  return defHttp.get({
    url: Api.TodoList
  })
}

export function addTodoListApi(data: any) {
  return defHttp.put({
    url: Api.TodoList,
    data
  })
}
