import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { getRouteMapItem } from '@/router/menu'

function userDetail() {
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    const menuItem = getRouteMapItem(location.pathname)
    navigate(menuItem.active_menu as string)
  }
  return (
    <div>
      <Button onClick={goBack}>返回</Button>
      userDetail
    </div>
  )
}
export default userDetail
