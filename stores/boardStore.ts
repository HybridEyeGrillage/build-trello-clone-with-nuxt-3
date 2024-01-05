import boardData from '~/data/board.json';
import { useStorage } from '@vueuse/core';
import { v4 as uuid } from 'uuid';
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

  // Tasks
  const getTask = computed(() => {
    return (taskId: string) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find(task => task.id === taskId);
        if (task) {
          return task;
        };
      }
    };
  });

  function addTask(columnIndex: number, taskName: string) {
    board.value.columns[columnIndex].tasks.push({
      id: uuid(),
      name: taskName,
      description: ''
    });
  }
  /**
   *
   * @param taskId Route
   */

  function deleteTask(taskId: string) {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        return;
      }
    }
  }

  /**
   * Add Column
   * @param columnName Name of the column
   */
  function addColumn(columnName: string) {
    board.value.columns.push({
      id: uuid(),
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
    addTask,
    deleteTask,
    addColumn,
    deleteColumn
  };
});