import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

/**
 * @author  huanxi
 * @date  2020/5/16 8:15 下午
 * @email 1355473748@qq.com
 */
//全部引入
import bmVlogin from 'bm-vlogin'
Vue.use(bmVlogin)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/index/Index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Index.vue')
    },
];
const router = new VueRouter({
    routes
})
export default router
