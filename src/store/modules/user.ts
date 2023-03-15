import { createSlice } from '@reduxjs/toolkit'
import localCache from '@/utils/localStore'

import { TOKEN_KEY } from '@/constants/user'

const initialState = {
  token: localCache.getItem(TOKEN_KEY) ?? ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      const { token } = action.payload
      state.token = token
      localCache.setItem(TOKEN_KEY, token)
    }
  }
})

export const { setToken } = userSlice.actions

export default userSlice.reducer
