import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css' // 或者选择其他样式

createApp(App).use(router).mount('#app')
