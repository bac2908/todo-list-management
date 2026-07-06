const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || 'Request failed';
    const details = data?.validationErrors
      ? Object.values(data.validationErrors).join(', ')
      : null;
    throw new Error(details ? `${message}: ${details}` : message);
  }

  return data;
}

export function getTasks({ keyword, status, priority, page = 0, size = 8 }) {
  const params = new URLSearchParams();
  if (keyword) params.set('keyword', keyword);
  if (status) params.set('status', status);
  if (priority) params.set('priority', priority);
  params.set('page', String(page));
  params.set('size', String(size));
  params.append('sort', 'createdAt,desc');

  return request(`/tasks?${params.toString()}`);
}

export function createTask(payload) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateTask(id, payload) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function toggleTask(id) {
  return request(`/tasks/${id}/toggle`, {
    method: 'PATCH',
  });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE',
  });
}
