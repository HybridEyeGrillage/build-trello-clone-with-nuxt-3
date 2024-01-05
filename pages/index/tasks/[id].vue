<template>
  <div class="task-wrapper">
    <div class="task-view">
      <h1>{{ task?.name }}</h1>
      <p>{{ task?.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useBoardStore } from '~/stores/boardStore';
  const route = useRoute()
  const task = computed(() => useBoardStore().getTask(route.params.id))
</script>
