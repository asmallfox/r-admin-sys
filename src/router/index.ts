import { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation, useRoutes } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/hooks/web/useApp'
import { basicRoutes } from './routes'
import { dynamicRoutes, addRouter } from './help/routeHelp'
import { PageEnum } from '@/enums/pageEnum'

let isDynamicRouter = false

export default function RouterElement() {
  const location = useLocation()

  const [routes, setRoutes] = useState(basicRoutes)
  const menuList = useAppSelector(
    (state) => state.menuReducer.menuList,
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
