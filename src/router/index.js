import { createRouter, createWebHistory } from 'vue-router'
import { firebase } from '../firebase'
//import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/perfil',
        name: 'Perfil',

        component: () =>
            import ( /* webpackChunkName: "perfil" */ '../views/Perfil.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/crud',
        name: ' Crud',

        component: () =>
            import ( /* webpackChunkName: "crud" */ '../views/Crud.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !(await firebase.getCurrenUser())) {
        next('/');
    } else {
        next();
    }
})

export default router