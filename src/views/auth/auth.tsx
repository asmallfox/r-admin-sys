import type { RouterRaws } from '@/router/routes/types'
import { cloneDeep } from 'lodash'
import { asyncRoutes } from '@/router/routes'
import { useSearchParams } from 'react-router-dom'

export default function AuthRouter() {
  const [search] = useSearchParams()
  const permission = search.get('permission')

  function handleRoutes(routes: RouterRaws[]) {
    routes.forEach((route, index) => {
      if (permission && route.meta?.permission?.includes(permission)) {
        routes.splice(index, 1)
      } else {
        route.children && handleRoutes(route.children)
        routes[index] = {
          title: route.meta?.title,
          path: route.path,
          children: route.children
        } as any
      }
    })
    return routes
  }
  const routeData = permission ? handleRoutes(cloneDeep(asyncRoutes)) : []
  const formatCode = JSON.stringify(routeData, null, 2)
  return (
    <div>
      <pre
        style={{
          lineHeight: 1.2,
          fontSize: '1rem',
          fontFamily: 'monospace, monospace'
        }}
      >
        <code>{formatCode}</code>
      </pre>
    </div>
  )
}
