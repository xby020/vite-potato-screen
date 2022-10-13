import { request } from '@/utils/http/axios';

export interface LoginParams {
  user: string;
  password: string;
}

export interface LoginUserInfo {
  /**
   * token
   */
  token: string;
  /**
   * 用户名称
   */
  name: string;
  /**
   * 用户UUID
   */
  uuid: string;
  /**
   * 用户头像
   * @type {string}
   * @memberof LoginUserInfo
   * @description  用户头像
   */
  avatar: string;
}

export function login(params: LoginParams) {
  return request<LoginUserInfo>({
    url: '/api/v1/login',
    method: 'post',
    data: params
  });
}
