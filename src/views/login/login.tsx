import { useDesign } from '@/hooks/web/useDesign'
import './style/index.scss'

import { Button, Checkbox, Form, Input, notification } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'

import type { UserInfo } from '@/api/modules/login'
import { useDispatch } from 'react-redux'
import { loginAsync } from '@/store/modules/user'
import localCache from '@/utils/localStore'
import { USERINFO_KEY, REDIRECT_HOME_BASE_KEY } from '@/constants'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { prefixCls } = useDesign('login')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const openNotification = () => {
    notification.open({
      message: 'welcome back',
      description: '登录成功',
      type: 'success',
      duration: 2
    });
  };

  async function handleFinish(values: any) {
    const { username = '', password = '', remember } = values
    const requestParams: UserInfo = {
      username,
      password
    }
    try {
      const res = await dispatch(loginAsync(requestParams))
      if (res && remember) {
        localCache.setItem(USERINFO_KEY, {
          username,
          password
        })
      }
      navigate(REDIRECT_HOME_BASE_KEY, {
        replace: true
      })
      openNotification()
    } catch (error) {
      console.warn(error)
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

  return <div className={prefixCls}>
    <Form className={prefixCls + '-form'} onFinish={handleFinish} initialValues={initUserInfo}>
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
}

export default Login