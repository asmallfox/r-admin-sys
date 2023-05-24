import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'

import { AuthRouter } from '@/components/AuthRouter'
import RouterElement from '@/router'
import { store } from '@/store'

function App() {
  const locale = zhCN
  dayjs.locale('zh-cn')
  console.log('App')
  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <AuthRouter>
          <RouterElement />
        </AuthRouter>
      </ConfigProvider>
    </Provider>
  )
}

export default App
