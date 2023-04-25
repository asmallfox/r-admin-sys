import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthRouter } from '@/components/AuthRouter'
import RouterElement from '@/router'

import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'

function App() {
  dayjs.locale('zh-cn')
  const locale = zhCN
  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <div className="App">
          <AuthRouter>
            <RouterElement />
          </AuthRouter>
        </div>
      </ConfigProvider>
    </Provider>
  )
}

export default App
