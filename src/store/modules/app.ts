import type { DarkMock } from '@/config/designConfig'

import { createSlice } from '@reduxjs/toolkit'

import  { darkMode } from '@/config/designConfig'

interface appState {
  darkMode: DarkMock
  projectConfig: object
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: darkMode,
    projectConfig: {}
  } as appState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
    }
  }
})
export const { setDarkMode } = appSlice.actions

export default appSlice.reducer
