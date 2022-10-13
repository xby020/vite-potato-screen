/// <reference types="vite/client" />

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
const modules = import.meta.globEager('./**/*.ts');

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }

  const mod: any = modules[key];
  mockModules.push(...mod.default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
