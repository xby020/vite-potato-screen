<template>
  <div
    class="w-full h-full flex flex-col gap-12 justify-start items-center pt-24"
  >
    <div class="h-1/3">
      <vue3-lottie :animation-data="notFoundJson"></vue3-lottie>
    </div>
    <div class="flex flex-col justify-center items-center gap-4">
      <h1 class="text-xl font-bold tracking-wider">
        找不到您要的页面，请检查您的网址是否正确
      </h1>
      <n-button type="primary" class="w-32" size="medium" @click="jumpTo"
        >返回</n-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import notFoundJson from '@/assets/lottie/404-not-found.json';
import { PageEnum } from '@/enums/pageEnum';

const router = useRouter();

function jumpTo() {
  router.push(PageEnum.BASE_HOME);
}
</script>

<style scoped></style>
