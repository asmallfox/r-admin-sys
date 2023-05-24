import { basicRoutes } from '@/router/routes'
import { useRoutes, useNavigate } from 'react-router-dom'
import { buildRouteThunk } from '@/store/modules/menu'
import { shallowEqual } from 'react-redux'

import { useAppSelector, useAppDispatch } from '@/hooks/web/useApp'
import { dynamicRoutes, routeFactory } from '@/router/help/routeHelp'
import { PageEnum } from '@/enums/pageEnum'
import { memo } from 'react'

const TestRouter = memo(function TestRouter() {

  let finalRoutes = basicRoutes

  const menuList = useAppSelector(
    (state) => state.menuReducer.menuList,
    shallowEqual
  )

  const dyRoutes = dynamicRoutes(menuList)
  if (dyRoutes?.length) {
    const rootRoute = basicRoutes.find((route) => route.path === '/')
    rootRoute.children = dyRoutes
    finalRoutes = routeFactory([
      ...basicRoutes.filter((item) => item.path !== PageEnum.BASE_ROOT),
      rootRoute
    ])
  }

  return useRoutes(finalRoutes)
})

export default TestRouter
