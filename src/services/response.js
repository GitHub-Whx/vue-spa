import Vue from 'vue';
import _ from 'underscore';
import {
    Message,
} from 'element-ui';

import store from '../store';

const message = Vue.component(Message.name, Message);

const handles = {
  handle: (response) => {
    if (_.includes([401, 402, 403, 404, 500, 503], response.status)) {
      return handles[`handle${response.status}`](response);
    }
    return response;
  },
  handle401: () => {
    console.log(401);
    store.clearUserInfo();
    window.vue.$router.push({ name: 'login' });
    // message({
    //   showClose: true,
    //   duration: 1500,
    //   message: '对不起，您的尚未登录或长时间未未活动，请重新登录！',
    //   type: 'error',
    // });
    return false;
  },
  handle403: () => {
    console.log(403);
    message({
      showClose: true,
      message: '权限不够吧',
      type: 'error',
    });
    return false;
  },
  handle404: () => {
    console.log(404);
    message({
      showClose: true,
      message: '找不到您要的页面！',
      type: 'error',
    });
    return false;
  },
  handle500: (response) => {
    console.log(500);
    message({
      showClose: true,
      message: `请求出错啦(>_<)，${response.body.msg}`,
      type: 'error',
    });
    return false;
  },
  handle502: (response) => {
    console.log(502);
    message({
      showClose: true,
      message: `请求出错啦(>_<)，${response.body.msg}`,
      type: 'error',
    });
    return false;
  },
};

export default handles;
