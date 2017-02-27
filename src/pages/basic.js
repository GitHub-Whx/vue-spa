export default {
  404: {
    title: 'Page Not Found',
    path: '/404',
    component: resolve => require(['./auth/404.vue'], resolve), // eslint-disable-line
    type: 'page',
    layout: 'single',
  },
  403: {
    title: 'You Have Not Permissions To Access.',
    component: resolve => require(['./auth/403.vue'], resolve), // eslint-disable-line
    path: '/403',
    type: 'page',
    layout: 'single',
  },
  401: {
    title: 'You Have Not Permissions To Access.',
    component: resolve => require(['./auth/401.vue'], resolve), // eslint-disable-line
    path: '/401',
    type: 'page',
    layout: 'single',
  },
  login: {
    title: '登录',
    component: resolve => require(['./auth/login.vue'], resolve), // eslint-disable-line
    path: '/login',
    layout: 'single',
    type: 'page',
  },
  'forgot-password': {
    title: '忘记密码',
    component: resolve => require(['./auth/forgot-password.vue'], resolve), // eslint-disable-line
    path: '/forgot-password',
    layout: 'single',
    type: 'page',
  },
  'reset-password': {
    title: '忘记密码',
    component: resolve => require(['./auth/reset-password.vue'], resolve), // eslint-disable-line
    path: '/reset-password',
    type: 'page',
    layout: 'single',
  },
};
