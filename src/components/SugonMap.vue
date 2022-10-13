<template>
  <div class="w-full h-full" id="map"></div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import { useMapStore } from '@/store/modules/map';
import { createGeoFence, flyTo, getDistrict } from '@/utils/gis/gis';

const route = useRoute();
const mapStore = useMapStore();

onMounted(async () => {
  AMapLoader.load({
    key: 'bdb0638a28f478220a73b5db9014654b',
    version: '2.0',
    plugins: ['AMap.DistrictSearch', 'AMap.Weather'],
    Loca: {
      version: '2.0.0'
    }
  }).then(async (AMapInstance: typeof AMap) => {
    /**
     * 初始化 AMap 和 Loca 实例
     */
    //@ts-ignore
    window.Loca = Loca;
    window.AMap = AMapInstance;

    /**
     * 创建地图实例
     */
    window.map = new AMapInstance.Map('map', {
      viewMode: '3D',
      zoom: 12,
      center: [114.21859, 30.554287],
      pitch: 55,
      mapStyle: 'amap://styles/8efdeeb1be783c59d6f0a76edc9dc2b2',
      showBuildingBlock: true
    });
    // set map ready
    window.map.on('complete', async () => {
      window.loca.animate.start();
      mapStore.mapReady = true;
    });

    //@ts-ignore
    window.loca = new Loca.Container({
      map: window.map
    });
  });
});
</script>

<style scoped></style>
