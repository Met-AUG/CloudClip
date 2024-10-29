import { createRouter, createWebHistory } from 'vue-router'
import ClipboardManager from './components/ClipboardManager.vue'
import SharedClipboard from './components/SharedClipboard.vue'
<<<<<<< HEAD

const routes = [
  { path: '/', component: ClipboardManager },
  { path: '/clip/:id', component: SharedClipboard }
=======
import ClipBoard from './components/ClipBoard.vue'

const routes = [
  { path: '/', component: ClipBoard },
  { path: '/clip/:id', component: SharedClipboard },
  { path: '/old', component: ClipboardManager}
>>>>>>> 510385f (fix)
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
