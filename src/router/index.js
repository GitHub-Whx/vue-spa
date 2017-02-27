import _ from 'underscore';
import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import '../bootstrap/';
import store from '../store/';
import config from '../config/';
import routes from '../config/routes';

Vue.use(Router);

const router = new Router({
  routes,
});

const userPromise = store.loadUserInfo(router);

router.beforeEach((route, redirect, next) => { // eslint-disable-line
  document.title = route.meta.title || config.siteName;

  if (_.contains(['/logout', '/modify-password'], route.path)) {
    return false;
  }

  if (_.contains(['404', '403', 'login', 'forgot-password'], route.name)) {
    return next();
  }

  if (route.matched.length === 0) {
    return next('/404');
  }

  // 已登录
  if (!_.isEmpty(store.user)) {
    store.setCurrentRoute(route.name);

    if (!store.hasAccess(route.name)) {
      return next('/403');
    }

    // 权限校验 TODO
    return next();
  }

  // 未登录且没有加载用户信息的行为 去登录吧
  if (!userPromise) {
    return next('/login');
  }

  // 刷新页面或初次加载
  return userPromise.then((resp) => {
    if (resp.code === 0) {
      store.setCurrentRoute(route.name);
      return next();
    }
    return next('/login');
  });
});

export default router;
