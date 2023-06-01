import { ThemeEnum } from '@/enums/themeEnum'
import { cacheEnum } from '@/enums/cacheEnum'
import localStore from '@/utils/localStore'

export type DarkMock = ThemeEnum.Dark | ThemeEnum.Light

export const darkMode =
  localStore.getItem(cacheEnum.APP_MODE_THEME_KEY) ||
  (window.matchMedia(`(prefers-color-scheme: ${ThemeEnum.Light})`).matches
    ? ThemeEnum.Dark
    : ThemeEnum.Light)
