import Vue from 'vue';
import Cookie from 'js-cookie';
import ElementUI from 'element-ui';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import moment from 'moment';
import _ from 'underscore';
import 'element-ui/lib/theme-default/index.css';

import dict from '../dict/';
import store from '../store/';
import response from '../services/response';

Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
  request.headers.set('X-XSRF-TOKEN', Cookie.get('XSRF-TOKEN') || 'none');
  next(response.handle);
});

moment.locale('zh-cn');

Vue.filter('format', (value, formatString) => {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
});

Vue.filter('user', (value) => {
  return dict.users[value];
});

Vue.filter('url', (value) => {
  if (!value) {
    return '';
  }
  return value.indexOf('http') > -1 ? value : `http://${value}`;
});

Vue.directive('can', (el, binding, vnode) => {
  if (!store.hasAccess(binding.value)) {
    el.innerHTML = 'You have not permission to see it!';
    el.setAttribute('style', 'display:none;');
  }
});

Vue.prototype.can = (key) => {
  return store.hasAccess(key);
}

Vue.prototype._ = _; // 注入 underscore
