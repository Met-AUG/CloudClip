import { createRouter, createWebHistory } from 'vue-router'
import ClipboardManager from './components/ClipboardManager.vue'
import SharedClipboard from './components/SharedClipboard.vue'

const routes = [
  { path: '/', component: ClipboardManager },
  { path: '/clip/:id', component: SharedClipboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
