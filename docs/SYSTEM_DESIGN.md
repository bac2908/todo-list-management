# System Design

## 1. Goal

Build a small but complete Todo List Management application that demonstrates:

- Java OOP and layered backend design.
- REST API design with validation and clear error responses.
- MySQL persistence with migration scripts.
- React component structure and API integration.
- Practical handling of edge cases, not only basic CRUD.

## 2. High Level Architecture

```txt
React Client
  |
  | HTTP/JSON
  v
Spring Boot REST API
  |
  | Spring Data JPA
  v
MySQL Database
```

## 3. Backend Layers

```txt
TaskController
  - Receives HTTP requests
  - Validates request bodies
  - Returns proper HTTP status codes

TaskService
  - Contains business logic
  - Normalizes input
  - Handles status transitions
  - Throws domain exceptions

TaskRepository
  - Persists Task entities
  - Supports search, filter, pagination, and sorting

Task Entity
  - Maps the tasks table
  - Owns core task fields and timestamps
```

## 4. Frontend Structure

```txt
App
  - Owns task page state
  - Calls API client
  - Coordinates filters, form, list, and pagination

TaskForm
  - Creates and updates tasks
  - Performs basic client-side validation

TaskFilters
  - Keyword search
  - Status filter
  - Priority filter

TaskList / TaskItem
  - Displays task states
  - Triggers edit, delete, and status toggle

Pagination
  - Navigates backend paginated results
```

## 5. Database Model

Table: `tasks`

| Column | Type | Note |
| --- | --- | --- |
| id | BIGINT | Primary key, auto increment |
| title | VARCHAR(120) | Required |
| description | VARCHAR(500) | Optional |
| status | VARCHAR(20) | PENDING or COMPLETED |
| priority | VARCHAR(20) | LOW, MEDIUM, HIGH |
| due_date | DATE | Optional |
| created_at | TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | Updated timestamp |

Indexes:

- `status` for status filter.
- `priority` for priority filter.
- `due_date` for future sorting or dashboard.
- `created_at` for default ordering.

## 6. API Contract

Base URL: `http://localhost:8080/api`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/tasks` | List tasks with search, filter, pagination, and sorting |
| GET | `/tasks/{id}` | Get one task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/{id}` | Update a task |
| PATCH | `/tasks/{id}/status` | Mark task as PENDING or COMPLETED |
| PATCH | `/tasks/{id}/toggle` | Toggle task status |
| DELETE | `/tasks/{id}` | Delete a task |

List query parameters:

| Param | Example | Note |
| --- | --- | --- |
| keyword | `readme` | Searches title and description |
| status | `PENDING` | Optional |
| priority | `HIGH` | Optional |
| page | `0` | Zero-based page index |
| size | `8` | Page size |
| sort | `createdAt,desc` | Spring Pageable sort syntax |

## 7. Main Flows

### Create Task

```txt
User submits form
  -> React validates required title
  -> POST /api/tasks
  -> Spring validates DTO
  -> Service trims title and description
  -> Repository saves task
  -> API returns 201 Created
  -> React reloads first page
```

### Search And Filter

```txt
User changes keyword/status/priority
  -> React updates query state
  -> GET /api/tasks with query params
  -> Service builds JPA Specification
  -> Repository returns Page<Task>
  -> React renders task cards and pagination
```

### Toggle Completion

```txt
User clicks status icon
  -> PATCH /api/tasks/{id}/toggle
  -> Service switches PENDING <-> COMPLETED
  -> React refreshes current page
```

## 8. Validation And Error Handling

Handled cases:

- Empty task title.
- Title longer than 120 characters.
- Description longer than 500 characters.
- Due date in the past.
- Invalid JSON request body.
- Invalid enum values.
- Task id not found.
- Empty list and empty search result.
- Backend request failure shown in the React UI.

Standard error response:

```json
{
  "timestamp": "2026-07-06T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/tasks",
  "validationErrors": {
    "title": "Title is required"
  }
}
```

## 9. Why This Design Scores Well

- Clear separation of responsibilities.
- DTOs protect the entity from direct API input.
- Service layer contains business rules.
- Repository layer keeps database access isolated.
- Flyway migration makes database setup repeatable.
- Swagger and Postman make API review easy.
- React components are small and focused.
- Pagination, sorting, search, filter, and responsive UI cover bonus items.

## 10. Future Improvements

- Add authentication and per-user task ownership.
- Add integration tests with Testcontainers.
- Add optimistic locking for concurrent updates.
- Add task activity history.
- Deploy backend and frontend online.
