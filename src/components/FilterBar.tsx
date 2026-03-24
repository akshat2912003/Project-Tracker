import { useTaskStore } from "../store/useTaskStore";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type Filters = {
  status: string[];
  priority: string[];
  assignee: string[];
  fromDate: string | null;
  toDate: string | null;
};

function FilterBar() {
  const { filters, setFilters } = useTaskStore();
  const [, setSearchParams] = useSearchParams();

  const toggleFilter = (type: keyof Filters, value: string) => {
    const current = filters[type];

    if (Array.isArray(current)) {
      if (current.includes(value)) {
        setFilters({
          [type]: current.filter((v) => v !== value),
        });
      } else {
        setFilters({
          [type]: [...current, value],
        });
      }
    }
  };

  useEffect(() => {
    const params: any = {};

    if (filters.status.length) params.status = filters.status.join(",");
    if (filters.priority.length) params.priority = filters.priority.join(",");
    if (filters.assignee.length) params.assignee = filters.assignee.join(",");
    if (filters.fromDate) params.fromDate = filters.fromDate;
    if (filters.toDate) params.toDate = filters.toDate;

    setSearchParams(params);
  }, [filters]);

  return (
    <div className="mt-4 space-y-3">
        <h1 className="text-2xl font-bold">Filtering Data</h1>

      <div className="flex gap-2 flex-wrap">
        {["todo", "in-progress", "in-review", "done"].map((s) => (
          <button
            key={s}
            onClick={() => toggleFilter("status", s)}
            className={`px-3 py-1 rounded border ${
              filters.status.includes(s)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {["low", "medium", "high", "critical"].map((p) => (
          <button
            key={p}
            onClick={() => toggleFilter("priority", p)}
            className={`px-3 py-1 rounded border ${
              filters.priority.includes(p)
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {["AS", "RK", "MJ", "SP", "DK", "NT"].map((a) => (
          <button
            key={a}
            onClick={() => toggleFilter("assignee", a)}
            className={`px-3 py-1 rounded border ${
              filters.assignee.includes(a)
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="date"
          value={filters.fromDate || ""}
          onChange={(e) => setFilters({ fromDate: e.target.value || null })}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={filters.toDate || ""}
          onChange={(e) => setFilters({ toDate: e.target.value || null })}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {filters.status.map((s) => (
          <div key={s} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1">
            Status: {s}
            <button onClick={() =>
              setFilters({ status: filters.status.filter((v) => v !== s) })
            }>✕</button>
          </div>
        ))}

        {filters.priority.map((p) => (
          <div key={p} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm flex items-center gap-1">
            Priority: {p}
            <button onClick={() =>
              setFilters({ priority: filters.priority.filter((v) => v !== p) })
            }>✕</button>
          </div>
        ))}

        {filters.assignee.map((a) => (
          <div key={a} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm flex items-center gap-1">
            Assignee: {a}
            <button onClick={() =>
              setFilters({ assignee: filters.assignee.filter((v) => v !== a) })
            }>✕</button>
          </div>
        ))}

        {filters.fromDate && (
          <div className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center gap-1">
            From: {filters.fromDate}
            <button onClick={() => setFilters({ fromDate: null })}>✕</button>
          </div>
        )}

        {filters.toDate && (
          <div className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center gap-1">
            To: {filters.toDate}
            <button onClick={() => setFilters({ toDate: null })}>✕</button>
          </div>
        )}
      </div>

      {(filters.status.length ||
        filters.priority.length ||
        filters.assignee.length ||
        filters.fromDate ||
        filters.toDate) && (
        <button
          onClick={() =>
            setFilters({
              status: [],
              priority: [],
              assignee: [],
              fromDate: null,
              toDate: null,
            })
          }
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;