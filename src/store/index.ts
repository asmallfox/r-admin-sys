import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import userStore from './modules/user'
import menuStore from './modules/menu'
import appStore from './modules/app'

export const store = configureStore({
  reducer: {
    userStore,
    menuStore,
    appStore
  }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
