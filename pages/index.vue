<template>
  <div class="board-wrapper">
    <main class="board">
      <BoardColumn
        v-for="(column, columnIndex) in useBoardStore().board.columns"
        :key="column.id"
        :column="column"
        :columnIndex="columnIndex"
      />
      <UContainer class="column">
        <UInput
          v-model="newColumnName"
          type="text"
          placeholder="Create new Column"
          icon="i-heroicons-plus-circle-solid"
          @keyup.enter="addColumn"
        />
      </UContainer>
    </main>
    <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
      <NuxtPage :key="route.fullPath"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "~/stores/boardStore";

useHead({
  title: 'Nuxt3 Trello Clone'
})
const newColumnName = ref("");
const router = useRouter()
const route = useRoute()

const isModalOpen = computed(() => route.name === 'index-tasks-id')

function addColumn() {
  useBoardStore().addColumn(newColumnName.value);
  newColumnName.value = "";
}

function closeModal() {
  router.push('/')
}
</script>

<style scoped></style>
