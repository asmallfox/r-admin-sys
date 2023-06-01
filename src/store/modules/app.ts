import type { DarkMock } from '@/setting/designSetting'

import { createSlice } from '@reduxjs/toolkit'

import { darkMode } from '@/setting/designSetting'
import { projectDefault } from '@/setting/projectDefault'

interface appState {
  darkMode: DarkMock
  projectConfig: object
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: darkMode,
    projectConfig: projectDefault
  } as appState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
    },
    setProjectConfig: (state, action) => {
      state.projectConfig = {
        ...projectDefault,
        ...action.payload
      }
    }
  }
})
export const { setDarkMode, setProjectConfig } = appSlice.actions

export default appSlice.reducer
