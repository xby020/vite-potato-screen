import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import { configMockPlugin } from './src/utils/mock';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    plugins: [
      vue(),
      WindiCSS(),

      // Html plugin
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            version: env.VITE_APP_VERSION
          }
        }
      }),

      // auto import components in templates
      Components({
        dts: 'src/types/components.d.ts',
        dirs: ['src/components'],
        resolvers: [IconsResolver(), NaiveUiResolver()]
      }),

      // auto import icons
      Icons({ compiler: 'vue3' }),

      // auto import api in scripts
      AutoImport({
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        imports: [
          // presets
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core'
        ],
        resolvers: [
          IconsResolver({
            prefix: 'icon'
          })
        ]
      }),

      // mock plugin
      configMockPlugin(env)
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@pages': resolve(__dirname, './src/pages')
      }
    },
    json: {
      // see https://cn.vitejs.dev/config/shared-options.html#json-stringify
      stringify: true
    },
    preview: {
      open: true
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT) || 14514,
      proxy: {
        '/api/v1': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api/v1`), '')
        },
        '/upload': {
          target: env.VITE_UPLOAD_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), '')
        },
        '/media': {
          target: env.VITE_MEDIA_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/media`), '')
        }
      }
    }
  };
};
