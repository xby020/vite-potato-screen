import { RouteRecordRaw } from 'vue-router';
import { Layout } from './constant';

export const ErrorPageRoute: RouteRecordRaw = {
  name: 'ErrorPage',
  path: '/:path(.*)*',
  component: Layout,
  meta: {
    title: '错误页面',
    noAuth: true,
    hide: true,
    icon: markRaw(IconBxError)
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'Error404',
      component: () => import('@pages/error/Error404.vue'),
      meta: {
        title: '404',
        noAuth: true,
        hide: true,
        icon: markRaw(IconTablerError404)
      }
    }
  ]
};

export const RedirectRoute: RouteRecordRaw = {
  name: 'Redirect',
  path: '/redirect/:path(.*)*',
  component: Layout,
  meta: {
    title: '重定向',
    noAuth: true,
    hide: true
  },
  children: [
    {
      path: '/redirect/:path(.*)*',
      name: 'RedirectSon',
      component: () => import('@pages/redirect/Redirect.vue'),
      meta: {
        title: '重定向',
        noAuth: true,
        hide: true
      }
    }
  ]
};
