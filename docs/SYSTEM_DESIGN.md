# Technical Notes

This file explains the current design of the Todo List app. It is not meant to
be a big architecture document; it is just the main reasoning behind the code.

## Overview

```txt
React UI
  |
  | HTTP / JSON
  v
Spring Boot REST API
  |
  | Spring Data JPA
  v
MySQL
```

The frontend and backend are separated because it keeps the API testable with
Swagger/Postman and makes the React side easier to change later.

## Backend

The backend follows a small layered structure:

```txt
TaskController -> TaskService -> TaskRepository -> MySQL
```

`TaskController`

- Receives HTTP requests.
- Lets Bean Validation check request bodies.
- Returns the right status codes for create, update and delete actions.

`TaskService`

- Keeps the main task rules in one place.
- Trims user input before saving.
- Handles status updates and toggle logic.
- Throws `ResourceNotFoundException` when a task id does not exist.

`TaskRepository`

- Extends Spring Data JPA.
- Uses `JpaSpecificationExecutor` so search and filters can be combined without
  creating many custom query methods.

DTO classes are used for request and response data. The entity stays focused on
database mapping, while the API shape can still change if needed.

## Frontend

The React app is split into a few small components:

```txt
App
TaskForm
TaskFilters
TaskList / TaskItem
Pagination
api/tasks.js
```

`App` owns the page state: filters, current page, editing task, loading state
and messages. The smaller components only handle their part of the screen.

The frontend calls `GET /api/tasks` again after create, update, delete and
status toggle. This is simple and keeps the screen in sync with the database.
Due date badges are calculated in the UI because they depend on the current
day of the user opening the app.

## Database

Table: `tasks`

| Column | Type | Note |
| --- | --- | --- |
| id | BIGINT | Primary key |
| version | BIGINT | Optimistic locking version |
| title | VARCHAR(120) | Required |
| description | VARCHAR(500) | Optional |
| status | VARCHAR(20) | `PENDING` or `COMPLETED` |
| priority | VARCHAR(20) | `LOW`, `MEDIUM`, `HIGH` |
| due_date | DATE | Optional |
| created_at | TIMESTAMP | Created time |
| updated_at | TIMESTAMP | Last updated time |

Flyway is used so the table can be created automatically on a fresh database.
The manual SQL files in `database/` are kept for easier review and demo data.

## API Notes

Base URL:

```txt
http://localhost:8080/api
```

| Method | Endpoint | Note |
| --- | --- | --- |
| GET | `/tasks` | Search, filter, paginate and sort |
| GET | `/tasks/{id}` | Get one task |
| POST | `/tasks` | Create task |
| PUT | `/tasks/{id}` | Update task |
| PATCH | `/tasks/{id}/status` | Set exact status |
| PATCH | `/tasks/{id}/toggle` | Switch pending/completed |
| DELETE | `/tasks/{id}` | Delete task |

Supported list params:

| Param | Example |
| --- | --- |
| keyword | `readme` |
| status | `PENDING` |
| priority | `HIGH` |
| page | `0` |
| size | `8` |
| sort | `createdAt,desc` |

## Validation And Errors

Handled cases include:

- Empty title.
- Title longer than 120 characters.
- Description longer than 500 characters.
- Due date in the past.
- Invalid enum value.
- Invalid JSON request body.
- Task id not found.
- Empty search result.
- Network/API error on the frontend.
- Due today, due soon and overdue states in the task list.

Example error response:

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

## Trade-offs

Some things are intentionally kept small for this version:

- No login or per-user task ownership.
- No soft delete or activity history.
- No online deployment yet.
- Tests cover the service, controller and repository layers; broader
  integration tests can be added later with Testcontainers.

The current version is enough to show CRUD, validation, pagination, API docs,
Docker setup and a readable project structure without making the app bigger
than the assignment needs.
