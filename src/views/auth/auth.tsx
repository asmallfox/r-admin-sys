import type { RouterRaws } from '@/router/routes/types'
import { useSearchParams } from 'react-router-dom'
import { asyncRoutes } from '@/router/routes'
import { cloneDeep } from 'lodash'

import { filterPermission } from '@/router/help/routeHelp'

interface RouteInfo {
  title: string
  path: string
  children?: RouteInfo[]
}

export default function AuthRouter() {
  const [search] = useSearchParams()
  const permission = search.get('permission')

  const generateMenu = (routes: RouterRaws[]) => {
    if (!permission) return []
    let filterData = filterPermission(cloneDeep(routes), permission)

    const generate = (data: RouterRaws[], result: RouteInfo[] = []) => {
      data.forEach((item) => {
        const routeInfo: RouteInfo = {
          title: item.meta?.title as string,
          path: item.path as string
        }
        if (item.children?.length) {
          routeInfo.children = []
          routeInfo.children = generate(item.children, routeInfo.children)
        }
        result.push(routeInfo)
      })
      return result
    }

    filterData = generate(filterData)

    return filterData
  }

  const data = generateMenu(asyncRoutes)

  const formatCode = JSON.stringify(data, null, 2)

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
