import { Search } from 'lucide-react';

function TaskFilters({ filters, onChange }) {
  function updateFilter(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="filters">
      <label className="search-box">
        <Search size={16} />
        <input
          value={filters.keyword}
          onChange={(event) => updateFilter('keyword', event.target.value)}
          placeholder="Search tasks"
        />
      </label>

      <div className="select-group">
        <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}>
          <option value="">All status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select value={filters.priority} onChange={(event) => updateFilter('priority', event.target.value)}>
          <option value="">All priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilters;
