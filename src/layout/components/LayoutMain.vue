<template>
  <div class="w-full h-full flex flex-col justify-start items-center">
    <!-- Header -->
    <div class="w-full h-64px">
      <LayoutHeader />
    </div>

    <!-- Content -->
    <div class="w-full flex-auto">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './LayoutHeader.vue';
</script>

<style scoped></style>
