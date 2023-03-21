import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
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
})
