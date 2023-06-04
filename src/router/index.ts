import { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation, useRoutes } from 'react-router-dom'

import { useAppSelector } from '@/hooks/web/useApp'
import { dynamicRoutes, addRouter } from './help/routeHelp'
import { basicRoutes } from './routes'
import { PageEnum } from '@/enums/pageEnum'
import { CacheEnum } from '@/enums/cacheEnum'
import { store } from '@/store'
import { buildRouteThunk } from '@/store/modules/menu'

let isDynamicRouter = false

export default function RouterElement() {
  const location = useLocation()

  const [routes, setRoutes] = useState(basicRoutes)
  const menuList = useAppSelector(
    (state) => state.menuStore.menuList,
    shallowEqual
  )

  const mountRoute = () => {
    const dyRoutes = dynamicRoutes(menuList)
    const finalRoutes = addRouter(dyRoutes)
    isDynamicRouter = true
    setRoutes(finalRoutes)
  }
  if (location.pathname !== PageEnum.BASE_LOGIN && !isDynamicRouter) {
    mountRoute()
  }

  return useRoutes(routes)
}

export async function setupRouter() {
  const token = localStorage.getItem(CacheEnum.TOKEN_KEY)
  if (token) {
    await store.dispatch(buildRouteThunk())
  }
}
