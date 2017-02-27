import home from '../pages/home';
import system from '../pages/system';
import test from '../pages/test';

export default [{
  name: '首页',
  index: 'welcome',
  groups: {
    工作台: [
      'welcome',
    ],
    系统管理: [
      'system.user.create',
      'system.user.index',
      'system.role.index',
      'system.group.index',
    ],
  },
  routes: {
    ...home,
    ...system,
    'common.company.update': {
      name: '更新工单信息[新建工单]',
      type: 'page',
      refer: 'order.common.create',
    },
  },
},
{
  name: 'Test',
  index: 'test',
  groups: {
    工作台: [
      'test',
    ],
  },
  routes: test,
},
];
