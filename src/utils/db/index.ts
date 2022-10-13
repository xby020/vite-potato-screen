import { LowSync, LocalStorage } from 'lowdb';
import cookies from '../cookies';
import lodash from 'lodash';

interface Database {
  [key: string]: any;
}

interface DatabaseParams {
  path?: string;
  user?: boolean;
  value?: any;
}

class LowSyncWithLodash<T> extends LowSync<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

const adapter = new LocalStorage<Database>('db');
const db = new LowSyncWithLodash(adapter);

db.read();
db.data = db.data || {};
db.write();

export default db;

export function pathInit({
  path = '',
  user = false,
  validator = (value: any) => true,
  defaultValue = ''
}: {
  path?: string;
  user?: boolean;
  validator?: (value: any) => boolean;
  defaultValue?: any;
}) {
  // 用户数据
  const userId = cookies.get('uuid') || 'ghost-uuid';

  // 路径
  const databasePath = 'database';
  const userPath = `${user ? userId : 'public'}`;
  const defaultPath = path ? `.${path}` : '';
  const currentPath = `${databasePath}.${userPath}${defaultPath}`;

  // 初始化数据
  const value = db.chain.get(currentPath).value();
  if (!(value !== undefined && validator(value))) {
    db.chain.set(currentPath, defaultValue).value();
    db.write();
  }

  return currentPath;
}

export function dbSet({ path = '', user = false, value = '' }: DatabaseParams) {
  const currentPath = pathInit({ path, user });
  db.chain.set(currentPath, value).value();
  db.write();
}

export function dbGet<T = any>({
  path = '',
  user = false,
  value = ''
}: DatabaseParams) {
  const currentPath = pathInit({ path, user, defaultValue: value });
  const data: T = db.chain.get(currentPath).value();
  return data;
}
