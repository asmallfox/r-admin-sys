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

export const fetchUserLogin = createAsyncThunk(
  'user/login',
  async (params: LoginParams, { dispatch }) => {
    const res = await loginApi(params)
    const { token } = res.data
    if (token) {
      dispatch(setToken({ token }))
      await dispatch(fetchLoginAfter())
    }
    return '成功'
  }
)

export const fetchLoginAfter = createAsyncThunk(
  'user/loginAfter',
  async (_, { dispatch }) => {
    const userInfo = await dispatch(fetchGetUserInfo())

    await dispatch(buildRouteThunk())

    return userInfo
  }
)

export const fetchGetUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, { getState, dispatch }) => {
    if (!(getState() as RootState).userReducer) return null
    const { data: userInfo } = await userInfoApi()
    if (userInfo) {
      dispatch(
        setUserInfo({
          userInfo
        })
      )
    }
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
  }
})

export const { setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer
