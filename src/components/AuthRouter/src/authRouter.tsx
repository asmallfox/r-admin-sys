import { Navigate, useLocation } from 'react-router-dom'
import { cacheEnum } from '@/enums/cacheEnum'
import localCache from '@/utils/localStore'

function AuthRouter(props: { children: JSX.Element }) {
  const { pathname } = useLocation()
  const isLogin = localCache.getItem(cacheEnum.TOKEN_KEY)

  if (!isLogin && pathname !== '/login') {
    return <Navigate to="/login" replace={true} />
  } else {
    return props.children
  }
}

export default AuthRouter
