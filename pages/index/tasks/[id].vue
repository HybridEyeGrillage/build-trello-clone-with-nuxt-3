<template>
  <div class="task-wrapper">
    <div v-if="task" class="task-view">
      <UFormGroup label="Name" class="w-full mb-4">
        <UInput type="text" v-model="task.name" />
      </UFormGroup>
      <UFormGroup label="Description" class="w-full">
        <UTextarea v-model="task!.description" />
      </UFormGroup>
      <UButton icon="i-heroicons-trash" color="red" class="mt-4" @click.prevent="deleteTask()">Delete Task</UButton>
    </div>
    <div v-else>
      <p class="task-view">
        Task not found
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore';
const router = useRouter();
const route = useRoute();
const task = computed(() => useBoardStore().getTask(route.params.id));

function deleteTask() {
  useBoardStore().deleteTask(route.params.id.toString());
  router.push('/');
}
</script>
