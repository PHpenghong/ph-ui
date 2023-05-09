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
npm config set registry http://172.16.39.136:4873  
pnpm config set registry http://172.16.39.136:4873

npm i ph-ui --registry=http://172.16.39.136:4873  
pnpm i ph-ui --registry=http://172.16.39.136:4873

## NPM
npm config set registry https://www.npmjs.com
pnpm config set registry https://www.npmjs.com

npm i ph-ui
pnpm i ph-ui

# 按需
```js
import { PTable } from 'ph-ui'
import PTable from 'ph-ui/lib/table'
import 'ph-ui/style/table'
```

# 全局样式
```js
import 'ph-ui/css'
```

# 发布组件
npm publish --registry=http://172.16.39.136:4873

# ts处理
```js
.d.ts 文件

declare module 'ph-ui'

declare module 'ph-ui/lib/*' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

```

