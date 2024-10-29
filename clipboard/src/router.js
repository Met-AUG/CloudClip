import { createRouter, createWebHistory } from 'vue-router'
import ClipboardManager from './components/ClipboardManager.vue'
import SharedClipboard from './components/SharedClipboard.vue'
import ClipBoard from './components/ClipBoard.vue'

const routes = [
  { path: '/', component: ClipBoard },
  { path: '/clip/:id', component: SharedClipboard },
  { path: '/old', component: ClipboardManager}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
