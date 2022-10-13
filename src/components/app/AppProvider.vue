<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <DialogContent />
      <n-notification-provider>
        <NotificationContent />
        <n-message-provider>
          <MsgContent />
          <slot name="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
    <LoadingBarContent />
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import MsgContent from './MsgContent.vue';
import DialogContent from './DialogContent.vue';
import LoadingBarContent from './LoadingBarContent.vue';
import NotificationContent from './NotificationContent.vue';
</script>
