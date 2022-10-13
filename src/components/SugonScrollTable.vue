<template>
  <div class="w-full h-full">
    <dv-scroll-board
      class="absolute w-full h-100px"
      :config="scrollBoardConfig"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  header: string[];
  data: string[][];
  row: number;
  width?: number[];
  align?: string[];
}

const props = defineProps<Props>();
const scrollBoardConfig = reactive({
  header: props.header,
  data: props.data,
  columnWidth: props.width,
  index: false,
  headerBGC: '#00597B50',
  oddRowBGC: '#002B3B80',
  evenRowBGC: '#FFFFFF00',
  rowNum: props.row,
  headerHeight: 35,
  align: props.align
});
</script>

<style scoped>
:deep(.dv-scroll-board .rows .row-item) {
  font-size: 14px !important;
  color: #999 !important;
}

:deep(.dv-scroll-board .rows .row-item .ceil:first-child) {
  font-size: 14px !important;
  color: #00e0ff !important;
  font-weight: bold !important;
}

:deep(.dv-scroll-board .header .header-item) {
  font-size: 14px !important;
}
</style>
