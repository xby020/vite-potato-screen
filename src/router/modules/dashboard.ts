import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/data',
    meta: {
      title: '主页',
      icon: markRaw(IconMdiViewDashboard),
      sort: 1,
      auth: true
    },
    children: [
      {
        path: 'data',
        name: 'Dashboard_data',
        component: () => import('@pages/dashboard/Dashboard.vue'),
        meta: {
          title: '数据看板',
          icon: markRaw(IconFluentDataBarVertical20Filled)
        }
      }
    ]
  }
];

export default routes;
