import { useTaskStore } from "../store/useTaskStore";
import { filterTasks } from "../utils/filterTasks";

function TimelineView() {
const { tasks, filters } = useTaskStore((state) => state);
const filteredTasks = filterTasks(tasks, filters);

  const daysInMonth = 31;
  const dayWidth = 40;
  const rowHeight = 30;

  const today = new Date().getDate();

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Timeline View</h2>

      <div className="overflow-x-auto border">
        <div
          className="relative"
          style={{
            width: daysInMonth * dayWidth,
            backgroundImage:
              "linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
            backgroundSize: `${dayWidth}px 100%`,
          }}
        >
          {/* Header */}
          <div className="flex border-b sticky top-0 bg-white z-10">
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <div
                key={i}
                className="text-xs text-center border-r border-gray-300"
                style={{ width: dayWidth }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-20"
            style={{ left: (today - 1) * dayWidth }}
          />

          <div
            className="relative"
            style={{ height: tasks.length * rowHeight }}
          >
            {tasks.slice(0, 40).map((task, index) => {
              const hasStart = !!task.startDate;

              const start = hasStart
                ? new Date(task.startDate!).getDate()
                : new Date(task.dueDate).getDate();

              const end = new Date(task.dueDate).getDate();

              const left = (start - 1) * dayWidth;
              const width = Math.max((end - start + 1) * dayWidth, dayWidth);

              const color =
                task.priority === "critical"
                  ? "red"
                  : task.priority === "high"
                  ? "orange"
                  : task.priority === "medium"
                  ? "gold"
                  : "green";

              return hasStart ? (
                <div
                  key={task.id}
                  className="absolute h-6 rounded text-xs text-white px-1 flex items-center"
                  style={{
                    top: index * rowHeight,
                    left,
                    width,
                    background: color,
                  }}
                >
                  {task.title}
                </div>
              ) : (
                <div
                  key={task.id}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    top: index * rowHeight + 8,
                    left,
                    background: color,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineView;