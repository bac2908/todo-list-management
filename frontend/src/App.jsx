import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ClipboardList, RefreshCw, Sun, Moon } from 'lucide-react';
import { createTask, deleteTask, getTasks, toggleTask, updateTask } from './api/tasks.js';
import TaskFilters from './components/TaskFilters.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import Pagination from './components/Pagination.jsx';

const emptyPage = {
  content: [],
  number: 0,
  totalPages: 0,
  totalElements: 0,
};

function App() {
  const [pageData, setPageData] = useState(emptyPage);
  const [filters, setFilters] = useState({
    keyword: '',
    status: '',
    priority: '',
  });
  const [page, setPage] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('todo-theme') || 'dark';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('todo-theme', theme);
  }, [theme]);

  const stats = useMemo(() => {
    const completed = pageData.content.filter((task) => task.status === 'COMPLETED').length;
    return {
      shown: pageData.content.length,
      total: pageData.totalElements,
      completed,
    };
  }, [pageData]);

  const completionRate = useMemo(() => {
    if (stats.shown === 0) return 0;
    return Math.round((stats.completed / stats.shown) * 100);
  }, [stats]);

  async function loadTasks(targetPage = page) {
    setLoading(true);
    setError('');

    try {
      const data = await getTasks({ ...filters, page: targetPage });
      setPageData(data);
      setPage(targetPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks(0);
  }, [filters.keyword, filters.status, filters.priority]);

  async function handleSubmit(formData) {
    setError('');
    setNotice('');

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        setNotice('Task updated.');
      } else {
        await createTask(formData);
        setNotice('Task created.');
      }

      setEditingTask(null);
      await loadTasks(0);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(task) {
    setError('');
    setNotice('');

    try {
      await toggleTask(task.id);
      await loadTasks(page);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(task) {
    const confirmed = window.confirm(`Delete "${task.title}"?`);
    if (!confirmed) return;

    setError('');
    setNotice('');

    try {
      await deleteTask(task.id);
      setNotice('Task deleted.');
      await loadTasks(pageData.content.length === 1 && page > 0 ? page - 1 : page);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <span className="eyebrow">Task workspace</span>
          <h1>Todo List Management</h1>
        </div>
        <div className="topbar-actions">
          <button
            className="theme-toggle-btn"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button" type="button" onClick={() => loadTasks(page)} title="Refresh tasks">
            <RefreshCw size={18} />
          </button>
        </div>
      </section>

      <section className="summary-grid">
        <div className="summary-card">
          <ClipboardList size={22} />
          <div className="stats-info">
            <strong>{stats.total}</strong>
            <span>Total tasks</span>
          </div>
        </div>

        <div className="summary-card">
          <CheckCircle2 size={22} />
          <div className="stats-info">
            <strong>{stats.completed} / {stats.shown}</strong>
            <span>Completed on page</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="stats-info">
            <strong>{completionRate}%</strong>
            <span>Page completion</span>
            <div className="progress-container">
              <div className="progress-bar-fill" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {notice && <div className="alert success">{notice}</div>}
      {error && <div className="alert danger">{error}</div>}

      <section className="workspace">
        <TaskForm
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
          onSubmit={handleSubmit}
        />

        <div className="task-panel">
          <TaskFilters
            filters={filters}
            onChange={(nextFilters) => {
              setFilters(nextFilters);
              setPage(0);
            }}
          />

          <TaskList
            tasks={pageData.content}
            loading={loading}
            onEdit={setEditingTask}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />

          <Pagination
            page={page}
            totalPages={pageData.totalPages}
            onPageChange={loadTasks}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
