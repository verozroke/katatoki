<template>
  <div>
    {{ route.params.userId }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<style scoped></style>