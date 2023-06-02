import SimpleMenu from './components/SimpleMenu'
import BasicMenu from './components/BasicMenu'
import { useAppSelector } from '@/hooks/web/useApp'
import { MenuModeEnum } from '@/enums/menuEnum'
import './styles/index.scss'

export default function LayoutMenu() {
  const { menuMode, darkMode } = useAppSelector((state) => ({
    menuMode: state.appStore.projectConfig.menu.mode,
    darkMode: state.appStore.darkMode
  }))
  return (
    <>
      {menuMode === MenuModeEnum.HORIZONTAL ? (
        <SimpleMenu theme={darkMode} />
      ) : (
        <BasicMenu />
      )}
    </>
  )
}
