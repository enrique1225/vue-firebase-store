import Vue from 'vue'
import Router from 'vue-router'

//routes
import defaultRoutes from './default';

// session components
const Login = () =>
    import ('Views/session/LoginOne');

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        defaultRoutes,

        {
            path: '/session/login',
            component: Login,
            meta: {
                title: 'message.login',
                breadcrumb: null
            }
        }
    ]
})