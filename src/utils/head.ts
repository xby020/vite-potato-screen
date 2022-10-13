import type { App } from 'vue';
import { createHead } from '@vueuse/head';

export function setupHead(app: App<Element>) {
  const head = createHead();
  app.use(head);
}
