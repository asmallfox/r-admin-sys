import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'

import type { RootState } from '@/store'
import { basicRoutes, RootRoute } from './routes'
import { routeFactory, dynamicRoutes } from './help/routeHelp'
import { PageEnum } from '@/enums/pageEnum'

export default function RouterElement() {
  const [routes, setRoutes] = useState(basicRoutes)

  const menuList = useSelector((state: RootState) => state.menuReducer.menuList)

  useEffect(() => {
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
