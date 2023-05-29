import type { RootState } from '@/store'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import localCache from '@/utils/localStore'

import { cacheEnum } from '@/enums/cacheEnum'

import { loginApi, userInfoApi } from '@/api'

import { buildRouteThunk } from './menu'

// const initialState = {
//   token: localCache.getItem(cacheEnum.TOKEN_KEY),
//   userInfo: localCache.getItem(cacheEnum.USER_INFO_KEY)
// }

interface LoginParams {
  username: string
  password: string
}

export const loginAction = createAsyncThunk(
  'user/login',
  async (params: LoginParams, { dispatch }) => {
    const res = await loginApi(params)
    const { token } = res.data
    if (token) {
      dispatch(setToken({ token }))
      await dispatch(loginAfterAction())
    }
    return '成功'
  }
)

export const loginAfterAction = createAsyncThunk(
  'user/loginAfter',
  async (_, { dispatch }) => {
    const userInfo = await dispatch(getUserInfoAction())

    await dispatch(buildRouteThunk())

    return userInfo
  }
)

export const getUserInfoAction = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const { data: userInfo } = await userInfoApi()
    return userInfo
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localCache.getItem(cacheEnum.TOKEN_KEY),
    userInfo: localCache.getItem(cacheEnum.USER_INFO_KEY)
  },
  reducers: {
    setToken(state, action) {
      const { token } = action.payload
      state.token = token
      localCache.setItem(cacheEnum.TOKEN_KEY, token)
    },
    setUserInfo(state, action) {
      const { userInfo } = action.payload
      state.userInfo = userInfo
      localCache.setItem(cacheEnum.USER_INFO_KEY, userInfo)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      state.userInfo = action.payload
      localCache.setItem(cacheEnum.USER_INFO_KEY, state.userInfo)
    })
  }
})

export const { setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer
