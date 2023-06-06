import { ThemeEnum } from '@/enums/themeEnum'
import { CacheEnum } from '@/enums/cacheEnum'
import localStore from '@/utils/localStore'

export type ThemeMock = ThemeEnum.Dark | ThemeEnum.Light

export const darkMode =
  localStore.getItem(CacheEnum.APP_MODE_THEME_KEY) ||
  (window.matchMedia(`(prefers-color-scheme: ${ThemeEnum.Light})`).matches
    ? ThemeEnum.Light
    : ThemeEnum.Dark)
