<template>
  <div class="w-full h-full bg-dark-600">
    <n-spin size="medium" :show="loading">
      <div
        class="w-full aspect-video"
        id="sugon-video"
        v-html="videoHtml"
      ></div>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { getCamLink } from '@/api/system/video';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Props {
  cameraIndexCode: string;
}

const props = defineProps<Props>();
const loadTime = ref(new Date().getTime());
const loading = ref(false);
const videoLink = ref('');
const player = ref();

const videoHtml = ref(
  `<video id="videoPlayer-${props.cameraIndexCode}-${loadTime.value}" class="w-full h-full video-js"></video>`
);

onMounted(async () => {
  loading.value = true;
  const res: any = await getCamLink(props.cameraIndexCode);
  videoLink.value = res.data.url;
  player.value = videojs(
    `videoPlayer-${props.cameraIndexCode}-${loadTime.value}`,
    {
      autoplay: true,
      controls: true,
      loop: true,
      sources: [
        {
          src: videoLink.value,
          type: 'application/x-mpegURL'
        }
      ]
    },
    function () {
      loading.value = false;
    }
  );
});

onUnmounted(() => {
  if (player.value) {
    player.value.dispose();
    videoHtml.value = '';
  }
});
</script>

<style scoped></style>
