import { basicRoutes } from './routes'
import { useRoutes } from 'react-router-dom'

import './help/routeHelp'

const RouterElement = () => useRoutes(basicRoutes)

export default RouterElement
