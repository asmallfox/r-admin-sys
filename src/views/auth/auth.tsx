import type { RouterRaws } from '@/router/routes/types'
import { cloneDeep } from 'lodash'
import { asyncRoutes } from '@/router/routes'
import { useSearchParams } from 'react-router-dom'

import { pathSnippets } from '@/router/help/menuHelp'

export default function AuthRouter() {
  const [search] = useSearchParams()
  const permission = search.get('permission')

  function filter(routes: RouterRaws[]) {
    routes.forEach((route) => {
      const needAuth = route.meta?.permission
      if (needAuth && !needAuth.includes(permission as string)) {
      }
    })
    return routes
  }
  let data = cloneDeep(asyncRoutes).filter(
    (item) =>
      !item.meta?.permission ||
      (item.meta.permission &&
        item.meta.permission.includes(permission as string))
  )
  data = filter(cloneDeep(asyncRoutes))
  console.log(data)
  // function handleRoutes(routes: RouterRaws[]) {
  //   routes.forEach((route, index) => {
  //     if (permission && route.meta?.permission?.includes(permission)) {
  //       routes.splice(index, 1)
  //     } else {
  //       route.children && handleRoutes(route.children)
  //       routes[index] = {
  //         label: route.meta?.title,
  //         children: route.children,
  //         active_menu: route.meta?.activeMenu,
  //         redirect: route.redirect,
  //         key: route.path,
  //         path: pathSnippets(route.path as string)[0],
  //         sort_index: route.meta?.sortIndex
  //       } as any
  //     }
  //   })
  //   return routes
  // }
  // const routeData = permission ? handleRoutes(cloneDeep(asyncRoutes)) : []
  // console.log(routeData)
  // const formatCode = JSON.stringify(routeData, null, 2)
  return (
    <div>
      <pre
        style={{
          lineHeight: 1.2,
          fontSize: '1rem',
          fontFamily: 'monospace, monospace'
        }}
      >
        {/* <code>{formatCode}</code> */}
      </pre>
    </div>
  )
}
