import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'
import AntUI from './antdUI'
import App from './App.vue'
import router from './router/index'
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.component('SvgIcon', SvgIcon).use(router).use(AntUI).mount('#app')
