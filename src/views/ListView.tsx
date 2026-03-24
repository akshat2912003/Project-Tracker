import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { filterTasks } from "../utils/filterTasks";

function ListView() {
  

const { tasks, filters } = useTaskStore((state) => state);
const filteredTasks = filterTasks(tasks, filters);

  const [scrollTop, setScrollTop] = useState(0);

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const rowHeight = 50;
  const containerHeight = 400;

  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortField) return 0;

    let valueA: any = a[sortField as keyof typeof a];
    let valueB: any = b[sortField as keyof typeof b];

    if (sortField === "dueDate") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    if (sortField === "priority") {
      const order: Record<string, number> = {
        critical: 4,
        high: 3,
        medium: 2,
        low: 1,
      };
      valueA = order[a.priority];
      valueB = order[b.priority];
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;

    return 0;
  });

  const visibleCount = Math.ceil(containerHeight / rowHeight);
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = startIndex + visibleCount + 5;

  const visibleTasks = sortedTasks.slice(startIndex, endIndex);
  const totalHeight = sortedTasks.length * rowHeight;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">List View</h2>

      <div className="flex bg-gray-200 text-sm font-semibold">
        <div
          className="p-2 w-1/5 cursor-pointer"
          onClick={() => handleSort("title")}
        >
          Title{" "}
          {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
        </div>

        <div className="p-2 w-1/5">Assignee</div>

        <div
          className="p-2 w-1/5 cursor-pointer"
          onClick={() => handleSort("priority")}
        >
          Priority{" "}
          {sortField === "priority" && (sortDirection === "asc" ? "↑" : "↓")}
        </div>

        <div className="p-2 w-1/5">Status</div>

        <div
          className="p-2 w-1/5 cursor-pointer"
          onClick={() => handleSort("dueDate")}
        >
          Due Date{" "}
          {sortField === "dueDate" && (sortDirection === "asc" ? "↑" : "↓")}
        </div>
      </div>

      <div
        className="border rounded overflow-auto"
        style={{ height: `${containerHeight}px` }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: `${totalHeight}px`, position: "relative" }}>
          {visibleTasks.map((task, index) => {
            const actualIndex = startIndex + index;

            return (
              <div
                key={task.id}
                style={{
                  position: "absolute",
                  top: actualIndex * rowHeight,
                  height: rowHeight,
                  left: 0,
                  right: 0,
                }}
                className="flex border-t bg-white text-sm items-center"
              >
                <div className="p-2 w-1/5">{task.title}</div>
                <div className="p-2 w-1/5">{task.assignee}</div>
                <div className="p-2 w-1/5">{task.priority}</div>
                <div className="p-2 w-1/5">
                    <select
                        value={task.status}
                        onChange={(e) =>
                        updateTaskStatus(task.id, e.target.value as any)
                        }
                        className="border rounded px-2 py-1 text-sm"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="in-review">In Review</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div className="p-2 w-1/5">
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListView;