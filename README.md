# Vue 3 + TypeScript + Vite UI Lib

## 安装运行
### 安装
```js
pnpm i
```
### 运行
```js
npm run dev
```
## 打包构建
> command 为打包命令文件， packages 为打包入口文件， lib 为打包生成文件

### 全局打包
```js
npm run lib

```
### 使用

# 安装
## 私服
npm config set registry http://addr
pnpm config set registry http://addr

npm i xx-ui --registry=http://addr 
pnpm i xx-ui --registry=http://addr

## NPM
npm config set registry https://www.npmjs.com
pnpm config set registry https://www.npmjs.com

npm i @without_end/ph-ui
pnpm i @without_end/ph-ui

# 按需
```js
import { PTable } from '@without_end/ph-ui'
import PTable from '@without_end/ph-ui/lib/table'
import '@without_end/ph-ui/style/table'
```

# 全局样式
```js
import '@without_end/ph-ui/css'
```

# 发布组件
<!-- npm publish --registry=http://addr -->

# ts处理
```js
.d.ts 文件

declare module '@without_end/ph-ui'

declare module '@without_end/ph-ui/lib/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

```

