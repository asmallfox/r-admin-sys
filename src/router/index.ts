import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { cloneDeep } from 'lodash'

import { basicRoutes, RootRoute } from './routes'
import { routeFactory, dynamicRoutes } from './help/routeHelp'
import { PageEnum } from '@/enums/pageEnum'
import { useAppSelector, useAppDispatch } from '@/hooks/web/useApp'
import { buildRouteThunk } from '@/store/modules/menu'

export default function RouterElement() {
  const [routes, setRoutes] = useState(basicRoutes)

  const dispatch = useAppDispatch()
  const { menuList, token } = useAppSelector((state) => {
    return {
      menuList: state.menuReducer.menuList,
      token: state.userReducer.token
    }
  })

  async function routerGuard() {
    await dispatch(buildRouteThunk())
  }

  useEffect(() => {
    if (token && menuList.length === 0) {
      routerGuard()
    }
    const dyRoutes = dynamicRoutes(menuList)
    if (dyRoutes?.length) {
      const rootRoute = cloneDeep(RootRoute)
      rootRoute.children = dyRoutes
      const finalRoutes = routeFactory([
        ...basicRoutes.filter((item) => item.path !== PageEnum.BASE_ROOT),
        rootRoute
      ])
      setRoutes(finalRoutes)
    }
  }, [menuList])

  return useRoutes(routes)
}
