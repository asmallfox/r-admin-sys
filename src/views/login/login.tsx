import { useDesign } from '@/hooks/web/useDesign'
import localCache from '@/utils/localStore'
import './styles/login.scss'

import LoginForm from './loginForm'
import { Button, Divider } from 'antd'
import { Icon } from '@/components/Icon'
import Theme from '@/components/Setting/src/Theme'
import { CacheEnum } from '@/enums/cacheEnum'
// import axios from 'axios'

export default function Login() {
  const { prefixCls } = useDesign('login')

  // 清除本地存储 localstorage
  localCache.removeItem(CacheEnum.TOKEN_KEY)
  localCache.removeItem(CacheEnum.USER_INFO_KEY)

  // const test = () => {
  //   axios.get('/api/getRoleById', { params: { id: 2 } }).then(({ data }) => {
  //     console.log(data)
  //   })
  // }

  return (
    <div className={prefixCls}>
      {/* <Button onClick={test}>test</Button> */}
      <div className={`${prefixCls}-panel`}>
        <div className={`${prefixCls}_theme`}>
          <Theme />
        </div>
        <div style={{ width: '360px' }}>
          <div className="mb-5 font-bold text-3xl">
            <span>登录</span>
          </div>
          <LoginForm />
          <div className="flex justify-evenly">
            <Button>手机登录</Button>
            <Button>二维码登录</Button>
            <Button>注册</Button>
          </div>
          <Divider style={{ fontSize: '14px', color: '#888' }}>
            其他登录方式
          </Divider>
          <div
            className="flex justify-evenly"
            style={{ fontSize: '28px', color: '#888' }}
          >
            <Icon type="icon-github-fill" />
            <Icon type="icon-weixin" />
            <Icon type="icon-shejiaotubiao-45" />
            <Icon type="icon-github-fill" />
            <Icon type="icon-tuitetwitter43" />
          </div>
        </div>
      </div>
    </div>
  )
}
