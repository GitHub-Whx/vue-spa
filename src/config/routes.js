import _ from 'underscore';
import home from '../pages/home';
import basic from '../pages/basic';
import test from '../pages/test';
import system from '../pages/system';

const routes = [];
const pages = {
  ...home,
  ...basic,
  ...system,
  ...test,
};

if (_.isObject(pages)) {
  for (const key in pages) { // eslint-disable-line
    const item = pages[key];
    item.meta = {
      title: item.title,
      layout: item.layout,
    };
    item.name = key;
    routes.push(item);
  }
}

export default routes;
