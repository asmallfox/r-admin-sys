import { useRoutes } from 'react-router-dom'

import basicRoutes from './routes/basic'

console.log(basicRoutes)

const RouterElement = () => useRoutes(basicRoutes)

export default RouterElement
