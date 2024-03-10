import { createRouter, createWebHashHistory } from 'vue-router'
import rootView from '../views/rootView.vue'

const routes = [
    {
        path: '/',
        name: 'root',
        component: rootView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
