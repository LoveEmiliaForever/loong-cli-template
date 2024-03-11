import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'

// 用于解决表格组件的大小调整出现为捕获错误
const debounce = (fn, delay) => {
    let timer = null
    return function () {
        const context = this // eslint-disable-line
        const args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}
const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor (callback) {
        callback = debounce(callback, 16)
        super(callback)
    }
}

// axios.defaults.baseURL = 'http://127.0.0.1:5000'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, { locale: zhCn }).use(VueAxios, axios).use(store).use(router).mount('#app')
