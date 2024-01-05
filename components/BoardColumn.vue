<template>
  <UContainer class="column">
    <div class="column-header mb-4">
      <div>
        <UInput v-if="editNameState" type="text" v-model="column.name" />
        <h2 v-else>{{ column.name }}</h2>
      </div>
      <div>
        <UButton icon="i-heroicons-pencil-square" class="mr-2" @click.prevent="editNameState = !editNameState" />
        <UButton icon="i-heroicons-trash" color="red" @click.prevent="deleteColumn(columnIndex)" />
      </div>
    </div>
    <ul>
      <li v-for="task in column.tasks" :key="task.id">
        <UCard class="mb-4" @click.prevent="goToTask(task.id)">
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput
      v-model="newTaskName"
      type="text"
      icon="i-heroicons-plus-circle-solid"
      @keyup.enter="addTask"
    />
  </UContainer>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/boardStore";

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
})
const editNameState = ref(false)
const newTaskName = ref('')
const router = useRouter()

function addTask() {
  useBoardStore().addTask(
    props.columnIndex,
    newTaskName.value
  );
  newTaskName.value = "";
}

function deleteColumn(columnIndex: number) {
  useBoardStore().deleteColumn(columnIndex)
}

function goToTask(taskId: string) {
  router.push(`tasks/${taskId}`)
}
</script>
