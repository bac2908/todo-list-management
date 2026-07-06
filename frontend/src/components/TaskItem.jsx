import { AlertTriangle, Calendar, Check, Pencil, Trash2 } from 'lucide-react';

const dayInMs = 24 * 60 * 60 * 1000;

function parseLocalDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function getDueInfo(dueDate, completed) {
  const date = parseLocalDate(dueDate);
  if (!date || Number.isNaN(date.getTime())) {
    return {
      label: `Due ${dueDate}`,
      tone: 'neutral',
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((date - today) / dayInMs);
  const formattedDate = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

  if (completed) {
    return {
      label: `Due ${formattedDate}`,
      tone: 'neutral',
    };
  }

  if (diffDays < 0) {
    const days = Math.abs(diffDays);
    return {
      label: `Overdue by ${days} ${days === 1 ? 'day' : 'days'}`,
      tone: 'overdue',
    };
  }

  if (diffDays === 0) {
    return {
      label: 'Due today',
      tone: 'today',
    };
  }

  if (diffDays === 1) {
    return {
      label: 'Due tomorrow',
      tone: 'soon',
    };
  }

  if (diffDays <= 3) {
    return {
      label: `Due in ${diffDays} days`,
      tone: 'soon',
    };
  }

  return {
    label: `Due ${formattedDate}`,
    tone: 'neutral',
  };
}

function TaskItem({ task, onEdit, onToggle, onDelete }) {
  const completed = task.status === 'COMPLETED';
  const dueInfo = task.dueDate ? getDueInfo(task.dueDate, completed) : null;

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

        {dueInfo && (
          <div className="task-meta">
            <span className={`due-date-meta ${dueInfo.tone}`}>
              {dueInfo.tone === 'neutral' ? <Calendar size={13} /> : <AlertTriangle size={13} />}
              <span>{dueInfo.label}</span>
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
