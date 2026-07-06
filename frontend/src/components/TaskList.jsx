import { Loader2 } from 'lucide-react';
import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, loading, onEdit, onToggle, onDelete }) {
  if (loading) {
    return (
      <div className="task-state">
        <Loader2 className="spin" size={22} />
        <span>Loading tasks...</span>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="task-state">
        <strong>No tasks found</strong>
        <span>Create a task or change the current filters.</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
