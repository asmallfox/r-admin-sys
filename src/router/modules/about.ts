import { lazyComponent } from '../basic'

export const aboutRouter = {
  path: '/about',
  element: lazyComponent('about'),
  meta: {
    icon: 123
  }
}