import ReactDOM from 'react-dom/client'

import 'virtual:windi.css'
// 样式初始化一般放最前面
import 'reset-css'
// UI框架的样式

// 全局样式
// import './assets/styles/global.scss'
// import './design/index.scss'

// 组件的样式
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import {setupRouter} from '@/router'

const boot = async () => {
  // 初始化路由
  await setupRouter()

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

boot()
