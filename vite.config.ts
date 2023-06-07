import type { UserConfigExport, ConfigEnv } from 'vite'

import path from 'path'
import { loadEnv } from 'vite'
/* @ts-ignore */
import { createVitePlugins } from './build/vite/plugin'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const isBuild = command === 'build'

  const env = loadEnv(mode, root)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_USE_MOCK } = env

  const viteEnv = {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_USE_MOCK
  }

  console.log()

  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 全局引入变量，给导入的路径最后加上 ;
          additionalData: `@use '@/design/index.scss' as *;`,
          javascriptEnabled: true
        }
      }
    },
    server: {
      host: true,
      port: Number(VITE_PORT)
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
