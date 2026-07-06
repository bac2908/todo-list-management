# Todo List Management

A small full-stack todo app for practicing a normal CRUD flow with React,
Spring Boot and MySQL. I kept the scope simple, but tried to make the parts
that reviewers usually check easy to run and easy to read.

## Stack

- Frontend: React, Vite, plain CSS
- Backend: Java 21, Spring Boot, Spring Web, Spring Data JPA
- Database: MySQL 8
- API docs: Swagger UI / OpenAPI
- Other: Docker Compose, Flyway, Postman collection, basic unit tests

## Features

- Create, update and delete tasks.
- Mark a task as pending or completed.
- Search by title or description.
- Filter by status and priority.
- Pagination from the backend API.
- Sort by newest task first.
- Highlight tasks that are due today, due soon or overdue.
- Validate invalid input on both frontend and backend.
- Show loading, empty, success and error states.
- Responsive layout for desktop and smaller screens.

## Project Structure

```txt
todo-list-management/
  backend/                 Spring Boot REST API
  frontend/                React application
  database/                Manual SQL and demo seed data
  docs/                    Short technical notes
  postman/                 Postman collection
  docker-compose.yml       MySQL + backend + frontend
```

## Run With Docker

Start Docker Desktop first.

The backend image copies the jar from `backend/target`, so build it once before
starting Docker Compose:

```powershell
cd backend
$env:MAVEN_OPTS="-Xmx256m -XX:MaxMetaspaceSize=160m"
mvn -DskipTests clean package
cd ..
docker compose up --build -d
```

Open:

```txt
Frontend:   http://localhost:3000
Backend:    http://localhost:8080
Swagger UI: http://localhost:8080/swagger-ui.html
OpenAPI:    http://localhost:8080/api-docs
MySQL:      localhost:3307
```

Useful commands:

```powershell
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mysql
docker compose down
```

Reset all Docker data:

```powershell
docker compose down -v
```

## Demo Data

Flyway creates and migrates the `tasks` table automatically when the backend
starts. When using Docker, do not run `database/schema.sql` manually; keep it as
a reference script for local review. To load demo tasks for checking pagination:

```powershell
Get-Content -Raw database\seed.sql | docker exec -i todo-list-mysql mysql -uroot -proot todo_list_db
```

The seed file inserts 18 tasks. The frontend requests 8 tasks per page, so the
pagination can be tested right away.

Docker database connection:

```txt
Database: todo_list_db
Username: root
Password: root
Backend host: mysql:3306
Local host: localhost:3307
```

## Run Locally

Use this option if MySQL is already running on your machine.

Create the database:

```sql
CREATE DATABASE IF NOT EXISTS todo_list_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

Run backend:

```powershell
cd backend
mvn spring-boot:run
```

Default local database config:

```txt
URL: jdbc:mysql://localhost:3306/todo_list_db
Username: root
Password: empty
```

If your MySQL password is not empty:

```powershell
$env:DB_PASSWORD="root"
mvn spring-boot:run
```

Run frontend:

```powershell
cd frontend
npm install
npm run dev
```

Frontend dev server:

```txt
http://localhost:5173
```

## API

Base URL:

```txt
http://localhost:8080/api
```

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/tasks` | List tasks with search, filter, pagination and sorting |
| GET | `/tasks/{id}` | Get one task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/{id}` | Update a task |
| PATCH | `/tasks/{id}/status` | Set task status |
| PATCH | `/tasks/{id}/toggle` | Toggle task status |
| DELETE | `/tasks/{id}` | Delete a task |

List query example:

```txt
GET /api/tasks?keyword=readme&status=PENDING&page=0&size=8&sort=createdAt,desc
```

Create request example:

```json
{
  "title": "Write README",
  "description": "Add setup steps and API notes",
  "priority": "HIGH",
  "dueDate": "2026-07-07"
}
```

## Postman

Import this file into Postman:

```txt
postman/Todo_List_Management_API.postman_collection.json
```

Collection variables:

```txt
baseUrl = http://localhost:8080
taskId = 1
```

## Tests

Backend unit tests:

```powershell
cd backend
mvn test
```

Frontend build check:

```powershell
cd frontend
npm run build
```

## Notes

- The app uses DTOs instead of exposing JPA entities directly through the API.
- Validation errors are returned in a consistent JSON format.
- `database/schema.sql` is kept for manual review; the running app uses Flyway
  migrations from `backend/src/main/resources/db/migration`.
- More design details are in `docs/SYSTEM_DESIGN.md`.
