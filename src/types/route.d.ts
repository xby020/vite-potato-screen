import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    /**
     * 路由ICON
     */
    icon?: FunctionalComponent<SVGAttributes, {}> | string;
    /**
     * 排序，数字越小越靠前,默认为0
     * @type {number}
     * @memberof RouteMeta
     */
    sort?: number;
    auth?: boolean;
  }
}
