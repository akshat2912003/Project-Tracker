import { create } from "zustand";
import { generateTasks } from "../data/generateTasks";
import type { Task, Status } from "../types/task";

interface Filters {
  status: string[];
  priority: string[];
  assignee: string[];
  fromDate: string | null;
  toDate: string | null;
}

interface TaskStore {
  tasks: Task[];

  filters: Filters;

  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, status: Status) => void;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: generateTasks(500),

  filters: {
    status: [],
    priority: [],
    assignee: [],
    fromDate: null,
    toDate: null,
  },

  setTasks: (tasks) => set({ tasks }),

  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));