import { defineStore } from 'pinia';

export interface MapStore {
  mapReady: boolean;
}

export const useMapStore = defineStore({
  id: 'app-map',
  state: (): MapStore => ({
    mapReady: false
  }),
  getters: {},
  actions: {}
});
