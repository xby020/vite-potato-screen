import { MockOptions } from '@/utils/mock';
import { MockMethod } from 'vite-plugin-mock';

const userMockData = {
  name: '管理员',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  uuid: 'admin',
  token: 'token123456'
};

export default [
  {
    url: '/api/v1/login',
    timeout: 1000,
    method: 'post',
    response: ({ body }: MockOptions) => {
      const { user, password } = body;
      if (user === 'admin' && password === 'admin') {
        return {
          code: 200,
          msg: '登录成功',
          data: userMockData
        };
      } else {
        return {
          code: 500,
          msg: '用户名或密码错误'
        };
      }
    }
  }
] as MockMethod[];
