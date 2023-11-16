import { PageEnum } from '@/enums/pageEnum';
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from './constantRoutes';
import { createRouterGuards } from './routeGuard';

// Async routes
const modules: any = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}
routeModuleList.sort(sortRoute);

export const asyncRouteList: RouteRecordRaw[] = [...routeModuleList];

// constant routes
const constantRouteList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: '首页',
      noAuth: true
    }
  }
];

// route
const routes = [...constantRouteList, ...asyncRouteList, RedirectRoute];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: true
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
