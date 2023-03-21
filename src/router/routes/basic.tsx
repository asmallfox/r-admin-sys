import type { RouterRaws } from './types'
import NotFount from '@/views/notFount/notFount'

export const NOT_FOUNT_ROUTE: RouterRaws = {
  path: '*',
  element: <NotFount />,
}
