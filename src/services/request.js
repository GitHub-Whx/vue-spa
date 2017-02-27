import Vue from 'vue';
import {
  Message
} from 'element-ui';

const message = Vue.component(Message.name, Message);

function sucCallback (response) {
  if (response.code !== 0) {
    message({
      showClose: true,
      message: `请求出错啦(>_<)，${response.msg}`,
      type: 'error',
    });
    throw response;
  }

  return response;
}

function errCallback (error) {
  if (error.status === 422) {
    throw error;
  }
  message({
    showClose: true,
    message: `请求出错啦(>_<), ${error.statusText}`,
    type: 'error',
  });

  throw error;
}
/* eslint no-param-reassign: 0 */
function send (type, url, body, options) {
  if (type === 'get') {
    return Vue.http[type](`${url}`, {
      // return Vue.http[type](`${config.apiBase}/api/p/admin/${url}`, {
      params: body,
      credentials: true,
    })
    .then((resp) => { // eslint-disable-line
      return resp.body;
    });
  }
  const defaultOptions = {
    headers: {
      // 'Z-BBS-X-XSRF-TOKEN': '',
    },
    credentials: true,
    // emulateJSON: true,
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  return Vue.http[type](`${url}`, {
      ...body,
    }, {
      ...finalOptions,
    })
    .then((resp) => { // eslint-disable-line
      return resp.body;
    })
    .then(sucCallback, errCallback);
}

const request = {
  get: (url, params) => send('get', url, params),
  put: (url, body, options) => send('put', url, body, options),
  post: (url, body, options) => send('post', url, body, options),
  delete: (url, body, options) => send('delete', url, body, options),
};

export default request;
