import type { LoginParams } from '@/api/modules/sys/user'
import { Button, Checkbox, Form, Input } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { useDesign } from '@/hooks/web/useDesign'
import localCache from '@/utils/localStore'
import { cacheEnum } from '@/enums/cacheEnum'
export interface FormValues extends LoginParams {
  remember?: boolean;
}


function LoginForm(props: {
  onLogin: (val: FormValues) => void
}) {
  const { prefixCls } = useDesign('login-form')
  const { onLogin } = props

  async function handleFinish(formData: FormValues) {
    const { username, password, remember } = formData
    onLogin && onLogin(formData)
    if (remember) {
      localCache.setItem(cacheEnum.USERINFO_KEY, {
        username,
        password
      })
    }
  }

  const rules = {
    username: [{ required: true, message: 'Input your username!' }],
    password: [{ required: true, message: 'Input your password!' }]
  }
  const localUserInfo = localCache.getItem(cacheEnum.USERINFO_KEY)
  const initUserInfo = {
    ...localUserInfo,
    remember: true
  }

  if (import.meta.env.MODE === 'development') {
    initUserInfo['username'] = initUserInfo['username'] ?? 'admin'
    initUserInfo['password'] = initUserInfo['password'] ?? '123456'
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
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          立即登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
