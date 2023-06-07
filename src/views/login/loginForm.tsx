import type { LoginParams } from '@/api/modules/sys/user'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { useDesign } from '@/hooks/web/useDesign'
import { CacheEnum } from '@/enums/cacheEnum'
import { PageEnum } from '@/enums/pageEnum'

import { useAppDispatch } from '@/store'
import { loginAction } from '@/store/modules/user'
import { useMessage } from '@/hooks/web/useMessage'
import localCache from '@/utils/localStore'

export interface FormValues extends LoginParams {
  remember?: boolean
}

const LoginForm: React.FC = () => {
  const { prefixCls } = useDesign('login-panel-form')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { notification } = useMessage()
  const [loading, setLoading] = useState(false)

  const rules = {
    username: [{ required: true, message: 'Input your username!' }],
    password: [{ required: true, message: 'Input your password!' }]
  }
  const localUserInfo = localCache.getItem(CacheEnum.ACCOUNT_INFO_KEY)
  const initUserInfo = {
    ...localUserInfo,
    remember: true
  }
  
  if (import.meta.env.VITE_APP_ENV === 'development') {
    initUserInfo['username'] = initUserInfo['username'] ?? 'admin'
    initUserInfo['password'] = initUserInfo['password'] ?? '123456'
  }

  async function handleFinish(formData: FormValues) {
    try {
      setLoading(true)
      const { username, password, remember } = formData
      await dispatch(loginAction({ username, password }))
      navigate(PageEnum.BASE_HOME, { replace: true })
      notification.success({
        message: '登录成功',
        description: `欢迎回来 ${formData.username}`
      })
      if (remember) {
        localCache.setItem(CacheEnum.ACCOUNT_INFO_KEY, {
          username,
          password
        })
      }
    } catch (err) {
      console.error(err)
      notification.error({
        message: (err as Error).message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      className={prefixCls}
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
        <div className="flex justify-between">
          <Checkbox>记住密码</Checkbox>
          <span>忘记密码？</span>
        </div>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          loading={loading}
        >
          立即登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
