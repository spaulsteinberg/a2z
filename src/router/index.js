import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/main/MainView.vue';
import AccountView from '../views/profile/AccountView.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/',
        component: MainView
    },
    {
        path: '/explore',
        name: 'Explore',
        component: MainView
    },
    {
        path: '/profile/account',
        name: 'Account',
        component: AccountView
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;