import { defineConfig } from 'vitest/config'
import PluginVue from '@vitejs/plugin-vue'
import PluginJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [PluginVue(), PluginJsx()],
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/.tsx$/]
    },
    coverage: {
      // 覆盖率统计工具
      provider: 'c8',
      // 覆盖率的分母，packages/ 目录里
      // 所有src的源文件作为覆盖率统计的分母
      include: ['src/packages/**/*vue', 'src/packages/**/*tsx'],
      // 全量覆盖率计算
      all: true
    }
  }
})
