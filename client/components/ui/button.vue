<template>
  <v-btn class="px-6" :variant="mode" :style="{ color: textColor, width: width ? width : 'fit-content' }"
    style="text-transform: none" :color="color">
    <slot />
  </v-btn>
</template>

<script setup lang="ts">

defineProps<{
  color: string,
  textColor?: string,
  width?: string,
  mode: 'elevated' | 'tonal' | 'outlined',
}>()

</script>

<style scoped></style>