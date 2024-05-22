<template>
  <div>
    <ToastProvider />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import ToastProvider from '~/providers/ToastProvider.vue'
</script>

<style>
.page-enter-from {
  opacity: 0;
}

.page-enter-active {
  transition: .1s;
}

.page-leave-to {
  opacity: 0;
}

.page-leave-active {
  transition: .1s;
}
</style>
