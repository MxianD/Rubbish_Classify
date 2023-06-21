import { createApp } from 'vue'
// import { createPinia } from "pinia";
import './style.css'
import App from './App.vue'
import router from "./router";//引入router
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//全局导入ElementIcon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import request from "./utils/request";
//导入axios
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:9000'

const app = createApp(App);
//全局导入ElementIcon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.$http = axios
// app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");