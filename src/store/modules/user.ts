import type { UserInfo } from '@/api/modules/login';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiLogin } from '@/api/modules/login';
import localCache from '@/utils/localStore';
import { TOKEN_KEY } from '@/constants/user';

export const USER_STORE = 'user_store';

const initUserState = {
  token: localCache.getItem(TOKEN_KEY) ?? '',
};


// 异步action
export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginInfo: UserInfo) => {
    try {
      const response = await apiLogin(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // state.token = 'token'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const token = action.payload.token ?? '';
        if (token) {
          localCache.setItem(TOKEN_KEY, token);
          state.token = token;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        Promise.reject(action.error);
      });
  },
});

// export const { } = userSlice.actions

export default userSlice.reducer;
