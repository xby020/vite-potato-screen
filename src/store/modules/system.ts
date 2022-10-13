import { defineStore } from 'pinia';
import { dbSet, dbGet } from '@/utils/db';
import { RouteRecordRaw } from 'vue-router';
import { useAsyncRoute } from './asyncRoute';

const dbSystemSettings = dbGet<SystemSettings>({
  path: 'settings',
  user: true
});

export interface SystemSettings {
  isExtend: boolean;
  theme: 'light' | 'dark' | 'auto';
  isDark: boolean;
}

export interface SystemStore extends SystemSettings {}

export const useSystemStore = defineStore({
  id: 'app-system',
  state: (): SystemStore => ({
    isExtend: dbSystemSettings.isExtend || true,
    theme: dbSystemSettings.theme || 'auto',
    isDark: false
  }),
  getters: {},
  actions: {
    toggleExtend() {
      this.isExtend = !this.isExtend;
    },
    setTheme(theme: SystemSettings['theme']) {
      this.theme = theme;
      dbSet({ path: 'settings', user: true, value: { theme: this.theme } });
    }
  }
});
