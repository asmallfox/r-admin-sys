import { createSlice } from '@reduxjs/toolkit'
import localCache from '@/utils/localStore'

import { cacheEnum } from '@/enums/cacheEnum'

const initialState = {
  token: localCache.getItem(cacheEnum.TOKEN_KEY) ?? ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      const { token } = action.payload
      state.token = token
      localCache.setItem(cacheEnum.TOKEN_KEY, token)
    }
  }
})

export const { setToken } = userSlice.actions

export default userSlice.reducer
