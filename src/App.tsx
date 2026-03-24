import { useState } from "react";
import KanbanView from "./views/KanbanView";
import ListView from "./views/ListView";
import TimelineView from "./views/TimelineView";
import FilterBar from "./components/FilterBar";

function App() {
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Project Tracker</h1>
      <FilterBar />

      <div className="mt-4 space-x-2">
        <button
          onClick={() => setView("kanban")}
          className={`px-4 py-2 rounded ${
            view === "kanban" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Kanban
        </button>

        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded ${
            view === "list" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          List
        </button>

        <button
          onClick={() => setView("timeline")}
          className={`px-4 py-2 rounded ${
            view === "timeline" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Timeline
        </button>
      </div>

      {view === "kanban" && <KanbanView />}
      {view === "list" && <ListView />}
      {view === "timeline" && <TimelineView />}
    </div>
  );
}

export default App;