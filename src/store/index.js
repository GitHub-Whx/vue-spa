import _ from 'underscore';
// import dict from '../dict/';
import request from '../services/request';
import permissions from '../config/permissions';

const store = {};

store.pageData = {}; // 夸页面传递数据

store.menus = [];
store.user = {};
store.nodes = [];

store.currentNavIndex = [];
store.currentNavPath = '/';
store.currentMenu = [];
store.currentRoute = null;
store.openedGroups = [];

store.setCurrentRoute = (key) => {
  if (key !== 'login') {
    store.currentRoute = key;
  }
  store.menus.forEach((g, i) => {
    if (g.routes[key]) {
      store.currentNavIndex = i;
      store.currentNavPath = g.routes[g.index].path;
      store.currentMenu = g;
      store.openedGroups = _.keys(g.groups);
    }
  });
};

store.setPermissions = (p) => {
  store.nodes = p;
  if (_.contains(p, 'super')) {
    store.menus = permissions;
    return ; //eslint-disable-line
  }

  permissions.forEach((g) => {
    const item = g;
    let flag = false;
    for (const k in item.groups) { // eslint-disable-line
      item.groups[k] = _.intersection(item.groups[k], p);
      if (item.groups[k].length > 0) {
        flag = true;
      } else {
        delete item.groups[k];
      }
    }
    if (flag) {
      store.menus.push(item);
    }
  });
};

store.loadUserInfo = () => {
  const xhr = request.get('/data/user/info.json')
  .then((res) => {
    if (res.code !== 0) {
      store.user = null;
      store.menus = [];
    } else {
      store.user = res.data.user;
      // _.extendOwn(dict, res.data.dict);
      store.setPermissions(res.data.permissions);
    }
    return res;
  });
  return xhr;
};

store.hasAccess = (x) => { // eslint-disable-line
  return _.contains(store.nodes, 'super') || _.contains(store.nodes, x);
};

store.getUserInfo = () => {
  console.log(123);
};

store.clearUserInfo = () => {
  store.user = {};
};

export default store;
