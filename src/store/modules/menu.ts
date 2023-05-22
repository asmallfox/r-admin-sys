import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMenuListApi } from '@/api'
import localCache from '@/utils/localStore'
import { cacheEnum } from '@/enums/cacheEnum'

export interface TagItem {
  label: string
  path: string
}

export const buildRouteThunk = createAsyncThunk(
  'menu/buildRoute',
  async (_, { dispatch }) => {
    const { data: menuList } = await getMenuListApi()

    dispatch(setMenuList(menuList))
    return menuList
  }
)

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    tagList: [{ label: '表盘仪', path: '/dashboard/analysis' }],
    menuList: []
  },
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
    },
    setMenuList: (state, { payload }) => {
      state.menuList = payload
    }
  }
})

export const { setTags, removeTag, setMenuList } = menuSlice.actions

export default menuSlice.reducer
