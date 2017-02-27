export default {
  test: {
    title: 'test',
    path: '/test',
    type: 'page',
    layout: 'page',
    component: require('./test.vue') // eslint-disable-line
  },
  test01: {
    title: 'testy',
    path: '/test/:id',
    type: 'page',
    layout: 'single',
    refer: 'test',
    component: require('./test01.vue') // eslint-disable-line
  }
};
