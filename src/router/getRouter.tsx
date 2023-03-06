import { useRoutes } from 'react-router-dom'
import routes from './index'

export function GetRouter() {
  const element = useRoutes(routes)

  return element
}

export default GetRouter
