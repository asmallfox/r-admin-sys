import '../styles/auth-router.scss'

import { Navigate, useLocation } from 'react-router-dom'

import { PageEnum } from '@/enums/pageEnum'
import { useDesign } from '@/hooks/web/useDesign'
import { useAppSelector } from '@/hooks/web/useApp'
import { CacheEnum } from '@/enums/cacheEnum'
import localStore from '@/utils/localStore'

interface Props {
  children: JSX.Element
}

function AuthRouter(props: Props) {
  const { prefixCls } = useDesign('auth-router')
  const { pathname } = useLocation()

  const token = localStore.getItem(CacheEnum.TOKEN_KEY)

  const isTargetLogin = !token && pathname !== PageEnum.BASE_LOGIN

  return (
    <div className={prefixCls}>
      {isTargetLogin ? (
        <Navigate to={PageEnum.BASE_LOGIN} replace={true} />
      ) : (
        props.children
      )}
    </div>
  )
}

export default AuthRouter
