import { theme } from 'antd'

import { ThemeEnum } from '@/enums/themeEnum'
import { useAppSelector } from './useApp'

export function useTheme() {
  const darkMode = useAppSelector((state) => state.appStore.darkMode)

  const isDarkMode = darkMode === ThemeEnum.Dark

  const themeAlgorithm = isDarkMode
    ? theme.darkAlgorithm
    : theme.defaultAlgorithm

  const useThemeToken = theme.useToken

  return {
    darkMode,
    isDarkMode,
    themeAlgorithm,
    useThemeToken
  }
}
