import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios  from "axios";

import "./assets/css/base.css"
import "./assets/css/vendor.css"
import "./assets/css/main.css"

createApp(App).use(router, axios).mount('#app')

