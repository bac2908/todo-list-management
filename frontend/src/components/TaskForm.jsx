import { useEffect, useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

const initialForm = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  dueDate: '',
};

function TaskForm({ editingTask, onCancel, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!editingTask) {
      setForm(initialForm);
      setFormError('');
      return;
    }

    setForm({
      title: editingTask.title ?? '',
      description: editingTask.description ?? '',
      priority: editingTask.priority ?? 'MEDIUM',
      dueDate: editingTask.dueDate ?? '',
    });
    setFormError('');
  }, [editingTask]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }

    if (form.title.trim().length > 120) {
      setFormError('Title must be at most 120 characters.');
      return;
    }

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim() || null,
      priority: form.priority,
      dueDate: form.dueDate || null,
    });
    setForm(initialForm);
    setFormError('');
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{editingTask ? 'Editing' : 'New task'}</span>
          <h2>{editingTask ? 'Update task' : 'Create task'}</h2>
        </div>
      </div>

      {formError && <div className="inline-error">{formError}</div>}

      <label>
        <span>Title</span>
        <input
          value={form.title}
          maxLength={120}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Write unit tests"
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          value={form.description}
          maxLength={500}
          rows={4}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder="Add edge cases for task validation"
        />
      </label>

      <div className="form-row">
        <label>
          <span>Priority</span>
          <select value={form.priority} onChange={(event) => updateField('priority', event.target.value)}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>

        <label>
          <span>Due date</span>
          <input
            value={form.dueDate}
            type="date"
            onChange={(event) => updateField('dueDate', event.target.value)}
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="primary-button" type="submit">
          {editingTask ? <Save size={17} /> : <Plus size={17} />}
          {editingTask ? 'Save' : 'Add'}
        </button>
        {editingTask && (
          <button className="ghost-button" type="button" onClick={onCancel}>
            <X size={17} />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
