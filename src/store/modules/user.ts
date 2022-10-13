import { defineStore } from 'pinia';
import { dbSet, dbGet } from '@/utils/db';
import cookies from '@/utils/cookies';
import Dayjs from 'dayjs';
import { login, LoginParams, LoginUserInfo } from '@/api/user/login';

export type User = {
  info: LoginUserInfo;
};

const user = dbGet<LoginUserInfo>({ path: 'user', user: true });

export const useUserStore = defineStore({
  id: 'user',
  state: (): User => ({
    info: user
  }),
  getters: {},
  actions: {
    /**
     * @description 设置用户信息
     *
     * @param {LoginUserInfo} userInfo
     */
    setUserInfo(userInfo: LoginUserInfo) {
      this.info = userInfo;
      // 持久化
      dbSet({ path: 'user', user: true, value: userInfo });
    },

    /**
     * @description 登录
     *
     * @param {LoginParams} params
     * @returns {Promise<UserInfo>}
     */
    async handleLogin(params: LoginParams) {
      const res = await login(params);
      // set cookies
      cookies.set('token', res.token);
      cookies.set('uuid', res.uuid);
      // setting user info store
      this.setUserInfo(res);
      return res;
    },
    /**
     * @description 登出
     *
     */
    logout() {
      this.info = {} as LoginUserInfo;
      dbSet({ path: 'user', user: true, value: this.info });
    }
  }
});
