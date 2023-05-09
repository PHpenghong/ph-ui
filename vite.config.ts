import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'

const pathResolve = (pathStr: string) => path.resolve(__dirname, pathStr)

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteCompression(),
    createSvgIconsPlugin({
      iconDirs: [pathResolve('./src/icons/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': pathResolve('src')
    },
    extensions: ['.js', '.json', '.ts', 'vue']
  },
  server: {
    port: 9528, // 自定义端口号，一般3000以后
    open: true // 是否自动浏览器打开
  }
})
