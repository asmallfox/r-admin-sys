import type { ThemeMock } from '@/setting/designSetting'
import type { ProjectDefault } from '@/setting/projectDefault'

import { createSlice } from '@reduxjs/toolkit'

import { darkMode } from '@/setting/designSetting'
import { projectDefault } from '@/setting/projectDefault'
import localStore from '@/utils/localStore'
import { CacheEnum } from '@/enums/cacheEnum'

interface appState {
  darkMode: ThemeMock
  projectConfig: ProjectDefault
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: darkMode,
    projectConfig:
      localStore.getItem(CacheEnum.APP_PROJECT_SETTING_KEY) || projectDefault
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
      localStore.setItem(CacheEnum.APP_PROJECT_SETTING_KEY, state.projectConfig)
    }
  }
})
export const { setDarkMode, setProjectConfig } = appSlice.actions

export default appSlice.reducer
