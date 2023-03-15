import type { UserInfo } from '@/api/modules/login'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'

import { useDesign } from '@/hooks/web/useDesign'
import { setToken } from '@/store/modules/user'
import localCache from '@/utils/localStore'
import { USERINFO_KEY } from '@/constants'
import { PageEnum } from '@/enums/pageEnum'
import { loginApi } from '@/api'
import { useMessage } from '@/hooks/web/useMessage'
import './style/login.scss'


function Login() {
  const { prefixCls } = useDesign('login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { notification } = useMessage()

  async function handleFinish(values: any) {
    const { username = '', password = '', remember } = values
    const requestParams: UserInfo = { username, password }
    try {
      const res = await loginApi(requestParams)
      if (res?.token) {
        if (remember) {
          localCache.setItem(USERINFO_KEY, { username, password })
        }
        notification.success({
          message: '登录成功',
          description: `欢迎回来 ${username}`
        })
      }
      dispatch(setToken({ token: res.token }))
      navigate(PageEnum.BASE_HOME, { replace: true })
    } catch (error) {
      notification.error({
        message: (error as Error).message
      })
      console.error(error)
    }
  }

  const rules = {
    username: [{ required: true, message: 'Input your username!' }],
    password: [{ required: true, message: 'Input your password!' }]
  }
  const localUserInfo = localCache.getItem(USERINFO_KEY)
  const initUserInfo = {
    ...localUserInfo,
    remember: true
  }

  if (import.meta.env.MODE === 'development') {
    initUserInfo['username'] = initUserInfo['username'] ?? 'admin'
    initUserInfo['password'] = initUserInfo['password'] ?? '123456'
  }

  return (
    <div className={prefixCls}>
      <Form
        className={prefixCls + '-form'}
        onFinish={handleFinish}
        initialValues={initUserInfo}
      >
        <Form.Item name="username" rules={rules.username}>
          <Input placeholder="username" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={rules.password}>
          <Input.Password placeholder="password" prefix={<UnlockOutlined />} />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            立即登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
