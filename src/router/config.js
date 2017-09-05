let config = [{
    path: '/',
    meta: {},
    component: resolve => require(['@/pages/home/home'], resolve)
},
{
    path: '/home',
    name: 'home',
    meta: {},
    component: resolve => require(['@/pages/home/home'], resolve)
},
{
    path: '/list',
    name: 'list',
    meta: {
        storePostion: true,
        storeWhenGo: ['detail'],
    },
    component: resolve => require(['@/pages/list/list'], resolve)
},
{
    name: 'detail',
    path: '/detail/:id',
    meta: {},
    component: resolve => require(['@/pages/detail/detail'], resolve)
},
{
    name: 'lottery',
    path: '/lottery',
    meta: {},
    component: resolve => require(['@/pages/lottery/lottery'], resolve)
}
]

export default config