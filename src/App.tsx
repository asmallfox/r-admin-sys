import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'

import { AuthRouter } from '@/components/AuthRouter'
import RouterElement from '@/router'
import { useTheme } from '@/hooks/web/useTheme'

const App: React.FC = () => {
  const locale = zhCN
  dayjs.locale('zh-cn')

  const { themeAlgorithm } = useTheme()
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm: themeAlgorithm
      }}
    >
      <AuthRouter>
        <RouterElement />
      </AuthRouter>
    </ConfigProvider>
  )
}

export default App
