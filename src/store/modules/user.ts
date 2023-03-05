import type {UserInfo} from '@/api/modules/login'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { apiLogin } from '@/api/modules/login'
import localCache from '@/utils/localStore'
import { TOKEN } from '@/constants/user'
import { redirect } from 'react-router-dom'

export const USER_STORE = 'user_store'

const initUserState = {
  token: ''
}

// 异步action
export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginInfo: UserInfo) => {
    try {
      const response = await apiLogin(loginInfo)
      // The value we return becomes the `fulfilled` action payload
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // state.token = 'token'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const token = action.payload.token ?? ''
        if (token) {
          localCache.setItem(TOKEN, token)
          state.token = token
          console.log('执行路由跳转')
          redirect('/home')
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        Promise.reject(action.error)
      })
  }
})

// export const { } = userSlice.actions

export default userSlice.reducer
