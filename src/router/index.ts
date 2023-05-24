import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation, useRoutes } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/hooks/web/useApp'
import { setDynamicRouter } from '@/store/modules/menu'
import { basicRoutes } from './routes'
import { dynamicRoutes, addRouter } from './help/routeHelp'
import { PageEnum } from '@/enums/pageEnum'

export default function RouterElement() {
  const location = useLocation()
  const dispatch = useAppDispatch()

  const [routes, setRoutes] = useState(basicRoutes)
  const { menuList, isDynamicRouter } = useAppSelector((state) => {
    return {
      menuList: state.menuReducer.menuList,
      isDynamicRouter: state.menuReducer.isDynamicRouter
    }
  }, shallowEqual)

  const mountRoute = () => {
    const dyRoutes = dynamicRoutes(menuList)
    const finalRoutes = addRouter(dyRoutes)
    if (location.pathname !== PageEnum.BASE_LOGIN && !isDynamicRouter) {
      dispatch(setDynamicRouter(true))
    }
    setRoutes(finalRoutes)
  }

  if (!isDynamicRouter) {
    mountRoute()
  }

  return useRoutes(routes)
}
