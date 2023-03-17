import { createSlice } from '@reduxjs/toolkit'

type tagItem = {
  label: string;
  routePath: string;
}

interface menuStore {
  tagList: tagItem[];
}

const initialState: menuStore = {
  tagList: [{ label: '表盘仪', routePath: 'dashboard/analysis' }]
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setTags: (state, action) => {
      const { payload: menuItem } = action
      if (!state.tagList.some(item => item.routePath === menuItem.routePath)) {
        state.tagList.push(menuItem)
      }
    },
    removeTag: (state, action) => {
      const { payload: routePath } = action
      const index = state.tagList.findIndex(item => item.routePath === routePath)
      if (index !== -1) {
        state.tagList.splice(index, 1)
      }
    }
  }
})



export const { setTags, removeTag } = menuSlice.actions

export default menuSlice.reducer