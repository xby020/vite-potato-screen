import { App } from 'vue';
import scrollbar from './scrollbar';
import { ScrollbarOptions } from 'smooth-scrollbar/interfaces';

export interface DirectivesOptions {
  scrollbar?: ScrollbarOptions;
}

export function setupDerictives(app: App, options?: DirectivesOptions) {
  app.directive('scrollbar', scrollbar(options?.scrollbar));
}
