import { throttle } from 'lodash'

import { useAppDispatch, useAppSelector } from '@/hooks/web/useApp'
import { useDesign } from '@/hooks/web/useDesign'
import { setDarkMode } from '@/store/modules/app'
import { CacheEnum } from '@/enums/cacheEnum'
import localStore from '@/utils/localStore'
import { Icon } from '@/components/Icon'

interface Props {
  className?: string
}

export default function Theme({ className }: Props) {
  const { prefixCls } = useDesign('theme')
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.appStore.darkMode)

  const switchChange = throttle((e: Event) => {
    e.stopPropagation()
    e.preventDefault()

    const theme = isDarkMode() ? 'light' : 'dark'
    const htmlDom = document.querySelector('.platform-win')
    if (htmlDom) {
      htmlDom.classList.remove(!isDarkMode() ? 'light' : 'dark')
      htmlDom.classList.add(theme)
      dispatch(setDarkMode(theme))
      localStore.setItem(CacheEnum.APP_MODE_THEME_KEY, theme)
    }
  }, 300)

  const isDarkMode = () => darkMode === 'dark'

  const getClass = () => {
    const cls = [prefixCls]

    if (isDarkMode()) {
      cls.push(`${prefixCls}__dark`)
    }

    if (className) {
      cls.push(className)
    }
    return cls.join(' ')
  }

  return (
    <div
      className={getClass()}
      onClick={(evt) => switchChange(evt as unknown as Event)}
    >
      <div className={`${prefixCls}_control`}></div>
      <Icon type="icon-sun" />
      <Icon type="icon-moon" />
    </div>
  )
}
