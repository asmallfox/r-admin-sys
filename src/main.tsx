import ReactDOM from 'react-dom/client'
import 'virtual:windi.css'
import 'reset-css'
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupRouter } from '@/router'
import { store } from '@/store'

const boot = async () => {
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

// production mock server
if (process.env.NODE_ENV === 'production') {
  console.log('production')
  import('../mock/_utils/mockProdServer').then(({ setupProdMockServer }) => {
    setupProdMockServer()
  })
}
