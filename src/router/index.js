import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/News',
        name: 'News',
        component: () => import("@/views/News.vue"),
    },
    {
        path: '/Screener',
        name: 'Screener',
        component: () => import("@/views/Screener.vue"),
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/Update',
        name: 'Update',
        component: () => import("@/views/Update.vue"),
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})

export default router
