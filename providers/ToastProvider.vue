<template>
  <v-snackbar :timeout="toastStore.timeout" :color="toastStore.color" location="top center" class="mt-9"
    v-model="toastStore.snackbar" elevation="24">
    <span class="text-white text-center font-medium text-lg flex items-center justify-center w-full h-full">{{
      toastStore.message
    }}</span>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/ToastStore';
const toastStore = useToastStore()
</script>

<style scoped></style>