import { createRouter, createWebHistory } from 'vue-router'
import SharedClipboard from './components/SharedClipboard.vue'
import ClipBoardWithHeader from './components/ClipBoardWithHeader.vue'

const routes = [
  { path: '/', component: ClipBoardWithHeader },
  { path: '/clip/:id', component: SharedClipboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
