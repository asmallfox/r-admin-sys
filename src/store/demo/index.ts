// @ts-nocheck
import { configureStore, createSlice } from '@reduxjs/toolkit'

/* 
  action
    action 是一个具有 type 字段的普通 JavaScript 对象
    你可以将 action 视为描述应用程序中发生了什么的事件.
*/
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
// action creator 是一个创建并返回一个 action 对象的函数。它的作用是让你不必每次都手动编写 action 对象：
const addTodo = (text) => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}

/* 
  reducer
    reducer 是一个函数，接收当前的 state 和一个 action 对象，必要时决定如何更新状态，并返回新状态。
    函数签名是：(state, action) => newState。
    你可以将 reducer 视为一个事件监听器，它根据接收到的 action（事件）类型处理事件。
*/
const initialState  = {
  value: 0,
  name: 'zs'
}

function counterReducer(state = initialState, action) {
  if (action.type === 'counter/increment') {
    return {
      ...state,
      value: state.value + 1
    }
  }
  // 返回原来的 state 不变
  return state
}

/* 
  Store
*/

const store = configureStore({
  reducer: counterReducer
})

// console.log(store, store.getState())
console.log(store);


/* 
  Dispatch
    Redux store 有一个方法叫 dispatch。
    更新 state 的唯一方法是调用 store.dispatch() 并传入一个 action 对象。 
    store 将执行所有 reducer 函数并计算出更新后的 state，调用 getState() 可以获取新 state。
*/

// 定义一个action type="counter/increment"， 一般使用函数的方式(action creator)
const counterAction = () => {
  return {
    type: 'counter/increment',
    payload: 'test'
  }
}

// store.dispatch({
//   type: 'counter/increment',
//   payload: {
//     msg: 'dispath 传递的数据'
//   },
//   name: 'xxx'
// })

// dispath 接收一个action对象
store.dispatch(counterAction())

// console.log(store.getState())

/* Selector */
const selectCounterValue = state => state.value
const currentValue = selectCounterValue(store.getState())
console.log('selectCounterValue: ', currentValue)


const couterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: ( state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1;
    },
  }
})
console.log("couterSlice: ", couterSlice);
console.log(couterSlice.actions.increment())

export {}