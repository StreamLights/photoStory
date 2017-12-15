import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './pages/layout.vue'
import Index from './pages/index.vue'
import UserInfo from './pages/userInfo.vue'
import PostArticle from './pages/postArticle.vue'
import Login from './pages/login.vue'
import Register from './pages/register.vue'

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/postArticle',
        component: PostArticle
    },
    {
        path: '/userinfo',
        component: UserInfo,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            }
        ]
    }
];
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router: router,
    template: '<Layout/>',
    components: { Layout }
});