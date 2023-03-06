import { Navigate } from 'react-router-dom'
import React, { lazy } from 'react'

import Home from '@/views/home/home'
import Login from '@/views/login/login'

import { LOGIN_BASE_KEY, REDIRECT_HOME_BASE_KEY } from '@/constants'

const withLoadingComponent = (comp: JSX.Element, Loading = <div>Loading...</div>) => (<React.Suspense fallback={Loading}>
  {comp}
</React.Suspense>)

function lazyComponent(componentName: string, LoadingElement = <div>Loading...</div>) {
  const Module = lazy(() => import(`@/views/${componentName}/${componentName}.tsx`))
  return withLoadingComponent(<Module />, LoadingElement)
}

export const basicRouter = [
  {
    path: '/',
    element: <Navigate to={REDIRECT_HOME_BASE_KEY} />
  },
  {
    path: REDIRECT_HOME_BASE_KEY,
    element: <Home></Home>
  },
  {
    path: '/about',
    element: lazyComponent('about')
  },
  {
    path: '/user',
    element: lazyComponent('user')
  },
  {
    path: LOGIN_BASE_KEY,
    element: <Login />
  }
]

