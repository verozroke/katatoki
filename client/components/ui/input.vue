<template>
  <v-text-field :label="label" :placeholder="placeholder ?? undefined" :counter="counter ?? undefined" :clearable="true"
    :rules="rules ?? []" :prepend-icon="prependIcon ?? null" :type="type" variant="outlined"></v-text-field>
</template>

<script setup lang="ts">

defineProps<{
  label: string,
  placeholder?: string,
  prependIcon?: string
  type: string
  rules?: any[],
  counter?: number,
}>()

</script>

<style scoped></style>