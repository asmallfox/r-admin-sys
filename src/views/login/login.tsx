import type { FormValues } from './loginForm'
import { useNavigate } from 'react-router-dom'
import { useDesign } from '@/hooks/web/useDesign'
import { PageEnum } from '@/enums/pageEnum'
import { useMessage } from '@/hooks/web/useMessage'
import localCache from '@/utils/localStore'
import './style/login.scss'

import LoginForm from './loginForm'

import { useAppDispatch } from '@/store'
import { fetchUserLogin } from '@/store/modules/user'

function Login() {
  const { prefixCls } = useDesign('login')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { notification } = useMessage()

  // 清除本地存储 localstorage
  localCache.clear()

  async function handleFinish(formData: FormValues) {
    try {
      const { username, password } = formData
      dispatch(fetchUserLogin({ username, password })).then((res) => {
        console.log('登录成功', res)
        // navigate(PageEnum.BASE_HOME, { replace: true })
        navigate('/user/admin')
        notification.success({
          message: '登录成功',
          description: `欢迎回来 ${formData.username}`
        })
      })
    } catch (error) {
      console.error(error)
      notification.error({
        message: (error as Error).message
      })
    }
  }

  return (
    <div className={prefixCls}>
      <LoginForm onLogin={handleFinish} />
    </div>
  )
}

export default Login
