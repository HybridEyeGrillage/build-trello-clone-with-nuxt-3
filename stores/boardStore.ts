import boardData from '~/data/board.json';
import { useStorage } from '@vueuse/core';

interface Tasks {
  id: string;
  name: string;
  description: string;
}

interface Columns {
  id: string;
  name: string;
  tasks: Tasks[];
}

interface Board {
  name: string;
  columns: Columns[];
}

export const useBoardStore = defineStore('boardStore', () => {
  const board = useStorage('board', boardData);

  const getTask = computed(() => {
    return taskId => {
      for (let column of board.value.columns) {
        const task = column.tasks.find(task => task.id === taskId);
        if (task) {
          return task;
        };
      }
    };
  });

  function addColumn(columnName: string) {
    board.value.columns.push({
      name: columnName,
      tasks: []
    });
  }
  function deleteColumn(columnIndex: number) {
    board.value.columns.splice(columnIndex, 1);
  }

  return {
    /* State */
    board,
    /* Getters */
    getTask,
    /* Actions */
    addColumn,
    deleteColumn
  };
});