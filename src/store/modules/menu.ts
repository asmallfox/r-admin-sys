import { createSlice } from '@reduxjs/toolkit'

export interface TagItem {
  label: string
  path: string
}

interface menuStore {
  tagList: TagItem[]
}

const initialState: menuStore = {
  tagList: [{ label: '表盘仪', path: '/dashboard/analysis' }]
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setTags: (state, action) => {
      const { payload: menuItem } = action
      if (!state.tagList.some((item) => item.path === menuItem.path)) {
        state.tagList.push({ label: menuItem.label, path: menuItem.path })
      }
    },
    removeTag: (state, action) => {
      const { payload: path } = action
      const index = state.tagList.findIndex((item) => item.path === path)
      if (index !== -1) {
        state.tagList.splice(index, 1)
      }
    }
  }
})

export const { setTags, removeTag } = menuSlice.actions

export default menuSlice.reducer
