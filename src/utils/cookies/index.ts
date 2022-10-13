import { merge } from 'lodash';
import Cookies, { CookieSetOptions } from 'universal-cookie';

const CookiesInstance = new Cookies([
  `sys-${import.meta.env.VITE_APP_VERSION}-`
]);

/**
 * @description 设置cookie
 *
 * @param {string} [name='default'] cookie名称
 * @param {string} [value=''] cookie值
 * @param {*} [cookiesSetting={}] cookie设置
 */
function set(name = 'default', value = '', cookiesSetting = {}) {
  const currentCookiesSetting: CookieSetOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
  };
  merge(currentCookiesSetting, cookiesSetting);
  CookiesInstance.set(`${name}`, value, currentCookiesSetting);
}

/**
 * @description 获取cookie
 *
 * @param {string} [name='default'] cookie名称
 * @return {*} cookie值
 */
function get(name = 'default') {
  return CookiesInstance.get(`${name}`);
}

/**
 * @description 获取所有cookie
 *
 * @return {*}
 */
function getAll() {
  return CookiesInstance.getAll();
}

/**
 * @description 删除cookie
 *
 * @param {string} [name='default']
 */
function remove(name = 'default') {
  CookiesInstance.remove(`${name}`);
}

const cookies = {
  set,
  get,
  getAll,
  remove
};

export default cookies;
