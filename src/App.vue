<template>
  <div class="w-screen h-screen">
    <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme="systemTheme"
      :theme-overrides="themeOverrides"
      class="w-screen h-screen"
    >
      <app-provider>
        <router-view></router-view>
      </app-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import {
  zhCN,
  dateZhCN,
  GlobalThemeOverrides,
  darkTheme,
  useOsTheme
} from 'naive-ui';
import { useSystemStore } from '@/store/modules/system';
import config from '../package.json';

// logout app version
console.log(
  `%c🥔app version: ${config.version}`,
  'color: #35f0ec; font-size: 18px;background:#3f3f3f;border-radius:3px;text-align:center;padding:5px;'
);

// set Icon
const iconPath = ref('/icon/logo.svg');
useFavicon(iconPath);

// set title
const route = useRoute();
const title = import.meta.env.VITE_APP_TITLE;
useHead({
  title: computed(() => {
    return `${route.meta.title || ''} - ${title}`;
  })
});

// Naive ui config
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0096FFFF',
    primaryColorHover: '#009DFFFF',
    primaryColorPressed: '#0077FFFF',
    primaryColorSuppl: '#004CFFFF'
  }
};

// System Settings
const systemTheme = ref();
const systemStore = useSystemStore();
const { theme, isDark } = storeToRefs(systemStore);
const setDarkTheme = (dark: boolean) => {
  if (dark) {
    isDark.value = true;
    document.body.classList.add('dark');
  } else {
    isDark.value = false;
    document.body.classList.remove('dark');
  }
};
watch(
  theme,
  () => {
    switch (theme.value) {
      case 'auto':
        const osTheme = useOsTheme();
        if (osTheme.value === 'dark') {
          systemTheme.value = darkTheme;
          setDarkTheme(true);
        } else {
          systemTheme.value = null;
          setDarkTheme(false);
        }
        break;
      case 'dark':
        systemTheme.value = darkTheme;
        setDarkTheme(true);
        break;
      case 'light':
        systemTheme.value = null;
        setDarkTheme(false);
        break;
      default:
        systemTheme.value = null;
        setDarkTheme(false);
        break;
    }
  },
  {
    immediate: true
  }
);
</script>

<style scoped>
@font-face {
  font-family: Emoji;
  src: local('Apple Color Emojiji'), local('Segoe UI Emoji'),
    local('Segoe UI Symbol'), local('Noto Color Emoji');
  unicode-range: U+1F000-1F644, U+203C-3299;
}

body {
  font-family: system-ui, —apple-system, Segoe UI, Rototo, Emoji, Helvetica,
    Arial, sans-serif;
}
</style>
