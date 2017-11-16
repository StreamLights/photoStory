import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './pages/layout.vue'
import Index from './pages/index.vue'

Vue.use(VueRouter);
const routes = [
    {path: '/', component: Index}
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