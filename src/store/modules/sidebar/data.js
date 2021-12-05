// Sidebar Routers
export const menus = {
    "message.menu": [{
            action: "zmdi-view-dashboard",
            title: "message.dashboard",
            path: "/dashboard",
            active: false,
            label: "Old",
        },
        {
            action: "zmdi-shopping-cart",
            title: "message.store",
            path: "/store/menu",
            active: false,
            label: "Old",
        },
        {
            action: 'zmdi-account-circle',
            title: 'message.user',
            active: false,
            path: "/users",
            label: 'Old',
        },
        {
            action: 'zmdi-calendar-note',
            title: 'Orders',
            active: false,
            items: null,
            path: '/orders',
            label: 'Old',
        },
        {
            action: 'zmdi-chart-donut',
            title: 'App',
            active: false,
            items: null,
            path: '/app',
            label: 'Old',
        }
    ]
};