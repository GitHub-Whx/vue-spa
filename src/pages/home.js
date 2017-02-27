export default {
  welcome: {
    title: '欢迎使用SuperAdmin系统',
    path: '/',
    type: 'page',
    refer: 'order.common.index',
    component: resolve => require(['./home/welcome.vue'], resolve), // eslint-disable-line
  },
  works: {
    title: '操作记录',
    path: '/works',
    type: 'page',
    component: resolve => require(['./home/works.vue'], resolve), // eslint-disable-line
  },

};
