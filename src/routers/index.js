import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
import Details from '../pages/Details.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        children: [
            {
                name: 'details',
                path: '/details/:id',
                component: Details
            }
        ]
    },
    {
        name: 'notFound',
        path: '/:catchAll(.*)',
        // component: NotFound
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;