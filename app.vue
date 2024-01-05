<template>
  <Html class="bg-emerald-500">
    <div>
      <NuxtPage />
    </div>
  </Html>
</template>

<script setup lang="ts">
const route = useRoute()

console.log(route.name)
</script>
