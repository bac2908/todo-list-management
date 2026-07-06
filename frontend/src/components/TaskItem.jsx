import { Check, Calendar, Pencil, Trash2 } from 'lucide-react';

function TaskItem({ task, onEdit, onToggle, onDelete }) {
  const completed = task.status === 'COMPLETED';

  return (
    <article className={`task-card ${completed ? 'completed' : ''}`}>
      <button
        className="status-checkbox"
        type="button"
        onClick={() => onToggle(task)}
        title={completed ? 'Mark as pending' : 'Mark as completed'}
      >
        <Check size={12} />
      </button>

      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>

        {task.description && <p>{task.description}</p>}

        {task.dueDate && (
          <div className="task-meta">
            <span className="due-date-meta">
              <Calendar size={13} />
              <span>Due {task.dueDate}</span>
            </span>
          </div>
        )}
      </div>

      <div className="task-actions">
        <button className="icon-button" type="button" onClick={() => onEdit(task)} title="Edit task">
          <Pencil size={15} />
        </button>
        <button className="icon-button danger-button" type="button" onClick={() => onDelete(task)} title="Delete task">
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
