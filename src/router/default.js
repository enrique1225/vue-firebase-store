import Full from 'Container/Full';

const Dashboard = () =>
    import ('Views/dashboard');
const StoreDetail = () =>
    import ('Views/stores/detail');
const StoreMenu = () =>
    import ('Views/stores/list');
const StoreOrderHistory = () =>
    import ('Views/stores/orderHistory');
const Transactions = () =>
    import ('Views/stores/transactions');
const Users = () =>
    import ('Views/users/list')
const UserDetail = () =>
    import ('Views/users/detail')
const UserOrderDetail = () =>
    import ('Views/users/order')
const Orders = () =>
    import ('Views/orders/list')
const OrderDetail = () =>
    import ('Views/orders/detail')
const AppInfo = () =>
    import ('Views/app/list')

export default {
    path: "/",
    component: Full,
    redirect: "/store/menu",
    children: [{
            path: "/dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true,
                title: 'message.dashboard',
            }
        },
        {
            path: "/store",
            redirect: "/store/menu"
        },
        {
            path: "/store/detail/:id",
            component: StoreDetail,
            meta: {
                requiresAuth: true,
                title: 'message.storeDetail',
            }
        },
        {
            path: "store/menu",
            component: StoreMenu,
            meta: {
                requiresAuth: true,
                title: 'message.storeMenu',
            }
        },
        {
            path: "/store/order_history/:id",
            component: StoreOrderHistory,
            meta: {
                requiresAuth: true,
                title: 'message.orderHistory'
            }
        },
        {
            path: "/store/transactions/:id",
            component: Transactions,
            meta: {
                requiresAuth: true,
                title: 'message.transactions'
            }
        },
        {
            path: 'users',
            component: Users,
            meta: {
                requiresAuth: true,
                title: 'message.users',
            }
        },
        {
            path: "/users/detail/:id",
            component: UserDetail,
            meta: {
                requiresAuth: true,
                title: 'message.userDetail',
            }
        },
        {
            path: "/users/order/:id/:id",
            component: UserOrderDetail,
            meta: {
                requiresAuth: true,
                title: 'message.order',
            }
        },
        {
            path: "/orders",
            component: Orders,
            meta: {
                requiresAuth: true,
                title: 'message.order',
            }
        },
        {
            path: "/orders/detail/:id",
            component: OrderDetail,
            meta: {
                requiresAuth: true,
                title: 'message.order',
            }
        },
        {
            path: "/app",
            component: AppInfo,
            meta: {
                requiresAuth: true,
                title: 'message.app',
            }
        }
    ]
}