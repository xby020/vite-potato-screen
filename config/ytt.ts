import { defineConfig } from 'yapi-to-typescript';

export default defineConfig([
  {
    serverUrl: 'http://yapi.sugonup.com/',
    typesOnly: true,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'production',
    outputFilePath: '../src/types/api.d.ts',
    requestFunctionFilePath: 'src/api/request.ts',
    dataKey: 'data',
    projects: [
      {
        token:
          'fc91f3e0878a302d51a2d8c3457594a4f6d08056b8cb105304746154d240bdef',
        categories: [
          {
            id: 0,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(interfaceInfo.path);

              // 若生成的请求函数名存在语法关键词报错、或想通过某个关键词触发 IDE 自动引入提示，可考虑加前缀，如:
              // return changeCase.camelCase(`api_${interfaceInfo.path}`)

              // 若生成的请求函数名有重复报错，可考虑将接口请求方式纳入生成条件，如:
              // return changeCase.camelCase(`${interfaceInfo.method}_${interfaceInfo.path}`)
            },
          },
        ],
      },
    ],
  },
  {
    serverUrl: 'http://yapi.sugonup.com/',
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'production',
    outputFilePath: '../src/api/dashboard/dashboard.ts',
    requestFunctionFilePath: '../src/utils/http/request.ts',
    dataKey: 'data',
    getRequestFunctionName(interfaceInfo, changeCase) {
      // 去掉 path 中的ApiS1
      const path = interfaceInfo.path.replace('/api/s1', '');

      return changeCase.camelCase(`${interfaceInfo.method}_${path}`);
    },
    projects: [
      {
        token:
          'caaa89306e8735c8727345cca082b06617e74926d719da363714e86e99ad237b',
        categories: [
          {
            id: 0,
          },
        ],
      },
    ],
  },
]);
