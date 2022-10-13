import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(env: Record<string, string>) {
  return viteMockServe({
    mockPath: 'mock',
    ignore: /^\_/,
    watchFiles: true,
    localEnabled: true,
    prodEnabled: env.VITE_PROD_BUILD === 'true'
  });
}

export interface MockOptions {
  body: Record<string, any>;
  query: Record<string, any>;
  headers: Record<string, any>;
  [key: string]: any;
}
