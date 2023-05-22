import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'

// import { AuthRouter } from '@/components/AuthRouter'
import RouterElement from '@/router'
import { store } from '@/store'

import { Suspense, lazy } from 'react'

const LazyAuthRouter = lazy(
  () => import('@/components/AuthRouter/src/authRouter')
)

function App() {
  const locale = zhCN
  dayjs.locale('zh-cn')

  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <Suspense fallback={<div>loading...</div>}>
          {/* <AuthRouter>
            <RouterElement />
          </AuthRouter> */}
          <LazyAuthRouter>
            <RouterElement />
          </LazyAuthRouter>
        </Suspense>
      </ConfigProvider>
    </Provider>
  )
}

export default App
