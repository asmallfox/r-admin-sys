import { Navigate } from 'react-router-dom'

import Main from '@/views/main/main'
import Login from '@/views/login/login'
import NotFount from '@/views/notFount/notFount'

import { REDIRECT_BASE_PATH, LOGIN_PATH } from '../constant'

import { layoutRoutes } from './index'

export const ROOT_ROUTE = {
  path: '/',
  // element: <Navigate to={REDIRECT_BASE_PATH} />,
  element: <Main/>,
  children: layoutRoutes
}

export const LOGIN_ROUTE = {
  path: LOGIN_PATH,
  element: <Login />,
}

export const NOT_FOUNT_ROUTE = {
  path: '*',
  element: <NotFount />,
}

export const basicRoutes = [ROOT_ROUTE, LOGIN_ROUTE, NOT_FOUNT_ROUTE]

export default basicRoutes
