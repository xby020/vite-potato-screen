import { PageEnum } from '@/enums/pageEnum';
import { useUserStore } from '@/store/modules/user';
import { useAsyncRoute } from '@/store/modules/asyncRoute';
import { Recordable } from 'vite-plugin-mock';
import { Router, RouteRecordRaw } from 'vue-router';
import { ErrorPageRoute } from './constantRoutes';

export function createRouterGuards(router: Router) {
  const userStore = useUserStore();
  const asyncRouteStore = useAsyncRoute();
  // Loading
  router.beforeEach((to, from, next) => {
    // Loading
    const Loading = window['$loading'] || null;
    Loading && Loading.start();

    // no need permission
    const { meta } = to;
    if (meta.noAuth) {
      next();
      return;
    }

    // no token
    const token = userStore.info.token;
    if (!token) {
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: PageEnum.LOGIN,
        replace: true
      };

      // redirect to login page
      if (to.path && to.path !== PageEnum.LOGIN) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        };
      }
      next(redirectData);
      return;
    }

    // has token

    // has permission routes
    if (asyncRouteStore.isAdded) {
      next();
      return;
    }

    const accessRoutes = asyncRouteStore.generateAsyncRoute();
    // add access routes dynamically
    accessRoutes.forEach((item) => {
      router.addRoute(item);
    });
    // add error page
    router.addRoute(ErrorPageRoute);
    const redirectPath = (from.query.redirect || to.path) as string;
    const nextData =
      to.path === redirectPath
        ? { ...to, replace: true }
        : { path: redirectPath };
    next(nextData);
    Loading && Loading.finish();
  });

  router.afterEach((to, from) => {
    // Loading
    const Loading = window['$loading'] || null;
    Loading && Loading.finish();
  });

  router.onError((error) => {
    console.log(error, 'router error');
  });
}
