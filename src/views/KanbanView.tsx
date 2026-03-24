import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { filterTasks } from "../utils/filterTasks";

const columns = [
  { key: "todo", title: "To Do" },
  { key: "in-progress", title: "In Progress" },
  { key: "in-review", title: "In Review" },
  { key: "done", title: "Done" },
];

function KanbanView() {
  

    const { tasks, filters } = useTaskStore((state) => state);
    const filteredTasks = filterTasks(tasks, filters);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [isDropped, setIsDropped] = useState(false);

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {columns.map((col) => {
        const columnTasks = filteredTasks.filter((task) => task.status === col.key);

        return (
          <div
            key={col.key}
            className={`p-3 rounded transition ${
              dragOverCol === col.key ? "bg-blue-100" : "bg-gray-100"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverCol(col.key);
            }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => {
              if (draggedTaskId) {
                updateTaskStatus(draggedTaskId, col.key as any);
                setDraggedTaskId(null);
                setDragOverCol(null);
                setIsDropped(true); // ✅ valid drop
              }
            }}
          >
            <h2 className="font-bold mb-2">
              {col.title} ({columnTasks.length})
            </h2>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {columnTasks.map((task) => {
                if (task.id === draggedTaskId) {
                  return (
                    <div
                      key={task.id}
                      className="h-[80px] bg-gray-300 rounded border-2 border-dashed"
                    />
                  );
                }

                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => {
                      setDraggedTaskId(task.id);
                      setIsDropped(false); 
                    }}
                    onDragEnd={() => {
                      if (!isDropped) {
                        setDraggedTaskId(null);
                      }
                      setIsDropped(false);
                    }}
                    className="bg-white p-3 rounded shadow cursor-grab transition-all duration-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{task.title}</p>

                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          task.priority === "critical"
                            ? "bg-red-500 text-white"
                            : task.priority === "high"
                            ? "bg-orange-400 text-white"
                            : task.priority === "medium"
                            ? "bg-yellow-400 text-black"
                            : "bg-green-400 text-black"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-xs">
                        {task.assignee}
                      </div>

                      <span>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanView;