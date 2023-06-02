import type { DarkMock } from '@/setting/designSetting'
import type { ProjectDefault } from '@/setting/projectDefault'

import { createSlice } from '@reduxjs/toolkit'

import { darkMode } from '@/setting/designSetting'
import { projectDefault } from '@/setting/projectDefault'
import localStore from '@/utils/localStore'

interface appState {
  darkMode: DarkMock
  projectConfig: ProjectDefault
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: darkMode,
    projectConfig: localStore.getItem('projectDefault') || projectDefault
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
      localStore.setItem('projectDefault', state.projectConfig)
    }
  }
})
export const { setDarkMode, setProjectConfig } = appSlice.actions

export default appSlice.reducer
