export default {
  'system.user.create': {
    title: '添加用户',
    path: '/system/user/create',
    type: 'menu',
    component: resolve => require(['./system/user.create.vue'], resolve), // eslint-disable-line
  },
  'system.user.index': {
    title: '用户列表',
    path: '/system/user/index',
    type: 'menu',
    component: resolve => require(['./system/user.index.vue'], resolve), // eslint-disable-line
  },
  'system.user.show': {
    title: '用户详情',
    path: '/system/user/:id',
    type: 'page',
    refer: 'system.user.index',
    component: resolve => require(['./system/user.show.vue'], resolve), // eslint-disable-line
  },
  'system.role.index': {
    title: '角色列表',
    path: '/system/role/index',
    type: 'menu',
    component: resolve => require(['./system/role.index.vue'], resolve), // eslint-disable-line
  },
  'system.role.show': {
    title: '角色详情',
    path: '/system/role/:id',
    type: 'page',
    refer: 'system.role.index',
    component: resolve => require(['./system/role.show.vue'], resolve), // eslint-disable-line
  },
  'system.group.index': {
    title: '小组列表',
    path: '/system/group/index',
    type: 'menu',
    component: resolve => require(['./system/group.index.vue'], resolve), // eslint-disable-line
  },
  'system.group.show': {
    title: '小组详情',
    path: '/system/group/:id',
    type: 'page',
    refer: 'system.group.index',
    component: resolve => require(['./system/group.show.vue'], resolve), // eslint-disable-line
  },
}
