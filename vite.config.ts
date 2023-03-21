// import { defineConfig, UserConfigExport } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'
// import WindiCSS from 'vite-plugin-windicss'
// import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     WindiCSS(),
//     viteMockServe({
//       mockPath: './mock/'
//     })
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src')
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         // 全局引入变量，给导入的路径最后加上 ;
//         additionalData: `@import '@/design/index.scss';`
//       }
//     }
//   }
// })

import { UserConfigExport, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      react(),
      WindiCSS(),
      viteMockServe({
        // default
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
    }
  }
}
