import type { UserConfigExport, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'
import { loadEnv } from 'vite'

import path from 'path'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {

  const root = process.cwd()
  const env = loadEnv(mode, root)

  const { VITE_PORT, VITE_PUBLIC_PATH } = env
  // const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH } = env
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: [
      react(),
      WindiCSS(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 全局引入变量，给导入的路径最后加上 ;
          additionalData: `@import '@/design/index.scss';`
        }
      }
    },
    server: {
      // https: true,
      host: true,
      port: Number(VITE_PORT),
      // proxy: {
      //   '/basic_api': {
      //     target: 'http://localhost:3000',
      //     rewrite: (path: string) => {
      //       return path.replace(/^\/basic-api/, "")
      //     }
      //   }
      // }
    },
  }
}
