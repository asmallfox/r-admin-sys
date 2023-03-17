import type { FormValues } from './loginForm'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useDesign } from '@/hooks/web/useDesign'
import { setToken } from '@/store/modules/user'
import localCache from '@/utils/localStore'
import { PageEnum } from '@/enums/pageEnum'
import { loginApi } from '@/api'
import { useMessage } from '@/hooks/web/useMessage'
import './style/login.scss'

import LoginForm from './loginForm'


function Login() {
  const { prefixCls } = useDesign('login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { notification } = useMessage()
  // 清除本地存储 localstorage
  localCache.clear()

  async function handleFinish(formData: FormValues) {
    try {
      const { token } = await loginApi(formData)
      if (token) {
        notification.success({
          message: '登录成功',
          description: `欢迎回来 ${formData.username}`
        })
      }
      dispatch(setToken({ token, username: formData.username }))
      navigate(PageEnum.BASE_HOME, { replace: true })
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
