import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useRoutes } from 'react-router-dom'

import { PageEnum } from '@/enums/pageEnum'
import { useAppSelector, useAppDispatch } from '@/hooks/web/useApp'
import { setDynamicRouter } from '@/store/modules/menu'
import { basicRoutes } from './routes'
import { dynamicRoutes, addRouter } from './help/routeHelp'

export default function RouterElement() {
  const [routes, setRoutes] = useState([])

  const dispatch = useAppDispatch()
  const { menuList, isDynamicRouter } = useAppSelector((state) => {
    return {
      menuList: state.menuReducer.menuList,
      isDynamicRouter: state.menuReducer.isDynamicRouter
    }
  }, shallowEqual)
  console.log('shallowEqual')
  const mountRoute = () => {
    const dyRoutes = dynamicRoutes(menuList)
    const finalRoutes = addRouter(dyRoutes)
    dispatch(setDynamicRouter(true))
    setRoutes(finalRoutes)
  }

  if (routes.length === 0) {
    setRoutes(basicRoutes)
  }

  return useRoutes(routes)
}
