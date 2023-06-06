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
import { Provider } from 'react-redux'
import { setupRouter } from '@/router'
import { store } from '@/store'

// import { setupProdMockServer } from '../mock/_mockProdServer'

const boot = async () => {
  // 初始化Mock
  if (import.meta.env.REACT_APP_ENV === 'production') {
    // setupProdMockServer()
  }
  // 初始化路由
  await setupRouter()

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

boot()
