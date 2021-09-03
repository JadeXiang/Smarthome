import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';

axios.defaults.baseURL = 'http://localhost:8000/'

createApp(App).use(store).use(router, axios).use(ElementPlus).mount('#app')
