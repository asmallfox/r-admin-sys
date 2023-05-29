import type { PluginOption } from 'vite'

import react from '@vitejs/plugin-react'
import windiCSS from 'vite-plugin-windicss'

import { configMockPlugin } from './mock'
import { configCompressPlugin } from './compress'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv

  const vitePlugins: PluginOption | PluginOption[] = [react(), windiCSS()]

  VITE_USE_MOCK && configMockPlugin(isBuild)

  configCompressPlugin()

  return vitePlugins
}
