import type { UserConfigExport, ConfigEnv } from 'vite'

import path from 'path'
import { loadEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugin'

import { viteMockServe } from 'vite-plugin-mock'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = {
    VITE_USE_MOCK: true
  }

  const { VITE_PORT, VITE_PUBLIC_PATH } = env

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 全局引入变量，给导入的路径最后加上 ;
          additionalData: `@use '@/design/index.scss' as *;`
          // additionalData: `@import '@/design/index.scss';`
        }
      }
    },
    server: {
      host: true,
      port: Number(VITE_PORT)
    },
    plugins: [
      ...createVitePlugins(viteEnv, isBuild),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true
      }),
    ]
  }
}
