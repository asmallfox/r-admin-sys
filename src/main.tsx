import React from 'react'
import ReactDOM from 'react-dom/client'
import localStore from '@/utils/localStore'

import 'virtual:windi.css'
// 样式初始化一般放最前面
import 'reset-css'
// UI框架的样式

// 全局样式
import './assets/styles/global.scss'

// 组件的样式
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import { cacheEnum } from './enums/cacheEnum'
import { buildRouteThunk } from '@/store/modules/menu'
import { store } from './store'

const boot = async () => {
  if (localStore.getItem(cacheEnum.TOKEN_KEY)) {
    await store.dispatch(buildRouteThunk())
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

boot()
