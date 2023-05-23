import { useDesign } from '@/hooks/web/useDesign'
import localCache from '@/utils/localStore'
import './style/login.scss'

import LoginForm from './loginForm'

function Login() {
  const { prefixCls } = useDesign('login')

  // 清除本地存储 localstorage
  localCache.clear()
  console.log('login')
  return (
    <div className={prefixCls}>
      <LoginForm />
    </div>
  )
}

export default Login
