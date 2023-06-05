import type { CSSProperties } from 'react'

import SimpleMenu from './components/SimpleMenu'
import BasicMenu from './components/BasicMenu'
import { ScrollBar } from '@/components/ScrollBar'
import { useAppSelector } from '@/hooks/web/useApp'
import { MenuModeEnum } from '@/enums/menuEnum'
import './styles/index.scss'

export default function LayoutMenu(props: DefaultProps) {
  const { style } = props

  const { menuMode, darkMode } = useAppSelector((state) => ({
    menuMode: state.appStore.projectConfig.menu.mode,
    darkMode: state.appStore.darkMode
  }))
  return (
    <>
      {menuMode === MenuModeEnum.HORIZONTAL ? (
        <SimpleMenu theme={darkMode} />
      ) : (
        <ScrollBar color="rgba(255,255,255,0.26)" style={style} always>
          <BasicMenu />
        </ScrollBar>
      )}
    </>
  )
}
