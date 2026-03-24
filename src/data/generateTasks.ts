import type { Task, Status, Priority } from "../types/task";

const statuses: Status[] = ["todo", "in-progress", "in-review", "done"];
const priorities: Priority[] = ["low", "medium", "high", "critical"];

const users = ["AS", "RK", "MJ", "SP", "DK", "NT"];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function generateTasks(count: number = 500): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const start = randomDate(new Date(2026, 2, 1), new Date(2026, 2, 20));
    const due = randomDate(new Date(2026, 2, 10), new Date(2026, 2, 30));

    tasks.push({
      id: `task-${i}`,
      title: `Task ${i + 1}`,
      assignee: getRandom(users),
      status: getRandom(statuses),
      priority: getRandom(priorities),
      startDate: Math.random() > 0.2 ? start.toISOString() : undefined,
      dueDate: due.toISOString(),
    });
  }

  return tasks;
}