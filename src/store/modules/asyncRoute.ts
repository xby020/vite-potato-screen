import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { asyncRouteList } from '@/router';
import { useUserStore } from './user';
import { reject } from 'lodash';

export interface AsyncRoute {
  accessRoutes: RouteRecordRaw[];
  isAdded: boolean;
}

export const useAsyncRoute = defineStore({
  id: 'app-async-route',
  state: (): AsyncRoute => ({
    accessRoutes: [],
    isAdded: false
  }),
  getters: {},
  actions: {
    async waitRoutesReady() {
      return new Promise<void>((resolve) => {
        let timer = 0;
        let timeout = 2000;
        const clock = setInterval(() => {
          timer += 100;
          if (this.isAdded) {
            clearInterval(clock);
            resolve();
          }
          if (timer >= timeout) {
            clearInterval(clock);
            reject('路由加载超时');
          }
        }, 100);
      });
    },
    generateAsyncRoute() {
      const userStore = useUserStore();

      const { info } = userStore;

      // 判断是否具有全局管理员权限，如果有，则不需要进行权限判断
      const isAdmin = () => true;

      const routeFilter = (route: RouteRecordRaw) => {
        const { meta } = route;
        // 路由不需要权限验证
        if (!meta || !meta.auth) {
          return true;
        }
        // 权限验证
        const hasPermission = isAdmin();
        return hasPermission;
      };

      const routeListFliter = (routeList: RouteRecordRaw[]) => {
        return routeList
          .filter((item) => {
            return routeFilter(item);
          })
          .map((item) => {
            item = Object.assign({}, item);
            if (item.children) {
              item.children = routeListFliter(item.children);
            }
            return item;
          });
      };

      this.accessRoutes = routeListFliter(asyncRouteList);
      this.isAdded = true;
      return this.accessRoutes;
    }
  }
});
