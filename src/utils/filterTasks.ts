import type { Task } from "../types/task";

interface Filters {
  status: string[];
  priority: string[];
  assignee: string[];
  fromDate: string | null;
  toDate: string | null;
}

export const filterTasks = (tasks: Task[], filters: Filters) => {
  return tasks.filter((task) => {
    if (
      filters.status.length &&
      !filters.status.includes(task.status)
    )
      return false;

    if (
      filters.priority.length &&
      !filters.priority.includes(task.priority)
    )
      return false;

    if (
      filters.assignee.length &&
      !filters.assignee.includes(task.assignee)
    )
      return false;

    const due = new Date(task.dueDate).getTime();

    if (filters.fromDate && due < new Date(filters.fromDate).getTime())
      return false;

    if (filters.toDate && due > new Date(filters.toDate).getTime())
      return false;

    return true;
  });
};