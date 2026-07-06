# Todo List Management App

Full-stack Todo List Management application for an Intern Developer test.

## Tech Stack

- Frontend: React.js, Vite, CSS
- Backend: Java 21, Spring Boot, Spring Web, Spring Data JPA, Bean Validation
- Database: MySQL
- API Docs: Swagger UI with springdoc-openapi
- Extra: Docker Compose, Flyway migration, Postman collection, README

## Features

- View task list with pagination and sorting.
- Create a new task.
- Update task information.
- Delete a task with confirmation.
- Mark task as completed or pending.
- Search by title or description.
- Filter by status and priority.
- Validate invalid input.
- Show loading, empty, success, and error states.
- Responsive UI.

## Project Structure

```txt
todo-list-management/
  backend/                 Spring Boot REST API
  frontend/                React client
  database/                Manual schema and seed SQL
  docs/                    System design document
  postman/                 Postman collection
  docker-compose.yml       MySQL + backend + frontend
```

## Prerequisites

For Docker run:

- Docker Desktop

For local run:

- Java 21
- Maven 3.9+
- Node.js 20+
- MySQL 8+

## Run Full App With Docker

Start Docker Desktop first, then run:

```bash
cd backend
set MAVEN_OPTS=-Xmx256m -XX:MaxMetaspaceSize=160m
mvn -DskipTests clean package
cd ..
docker compose up --build -d
```

Run tests separately when needed:

```bash
cd backend
mvn test
```

After all containers are running:

```txt
Frontend:   http://localhost:3000
Backend:    http://localhost:8080
Swagger UI: http://localhost:8080/swagger-ui.html
OpenAPI:    http://localhost:8080/api-docs
MySQL:      localhost:3307
```

Docker services:

| Service | Container | Port | Note |
| --- | --- | --- | --- |
| mysql | `todo-list-mysql` | `3307:3306` | MySQL database |
| backend | `todo-list-backend` | `8080:8080` | Spring Boot REST API |
| frontend | `todo-list-frontend` | `3000:80` | React app served by Nginx |

Docker database credentials:

```txt
Database: todo_list_db
Username: root
Password: root
Host from backend container: mysql
Host from your machine: localhost
Port from your machine: 3307
```

The backend connects to MySQL inside Docker with:

```txt
jdbc:mysql://mysql:3306/todo_list_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Ho_Chi_Minh
```

The frontend calls the backend through:

```txt
http://localhost:8080/api
```

Useful Docker commands:

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f mysql
docker compose logs -f frontend
docker compose down
```

Reset database data:

```bash
docker compose down -v
docker compose up --build
```

Import seed data into Docker MySQL:

```bash
docker exec -i todo-list-mysql mysql -uroot -proot todo_list_db < database/seed.sql
```

## Run Locally Without Docker

Use this option only if you already have MySQL running locally, for example from AMpps or XAMPP.

Create an empty database:

```sql
CREATE DATABASE IF NOT EXISTS todo_list_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

The backend uses Flyway, so the `tasks` table is created automatically when the app starts.

Run backend:

```bash
cd backend
mvn spring-boot:run
```

Default backend config:

```txt
Server: http://localhost:8080
Database URL: jdbc:mysql://localhost:3306/todo_list_db
Username: root
Password: empty
```

If your MySQL password is not empty:

```bash
set DB_PASSWORD=root
mvn spring-boot:run
```

If you use the Docker MySQL service from this project:

```bash
set DB_URL=jdbc:mysql://localhost:3307/todo_list_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Ho_Chi_Minh
set DB_PASSWORD=root
mvn spring-boot:run
```

Swagger UI:

```txt
http://localhost:8080/swagger-ui.html
```

OpenAPI JSON:

```txt
http://localhost:8080/api-docs
```

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

Optional frontend env:

```bash
copy .env.example .env
```

## Run Tests

Backend:

```bash
cd backend
mvn test
```

Frontend build check:

```bash
cd frontend
npm run build
```

## API Summary

Base URL:

```txt
http://localhost:8080/api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/tasks` | List tasks |
| GET | `/tasks/{id}` | Get one task |
| POST | `/tasks` | Create task |
| PUT | `/tasks/{id}` | Update task |
| PATCH | `/tasks/{id}/status` | Set task status |
| PATCH | `/tasks/{id}/toggle` | Toggle task status |
| DELETE | `/tasks/{id}` | Delete task |

Example create request:

```json
{
  "title": "Write README",
  "description": "Document setup steps",
  "priority": "HIGH",
  "dueDate": "2026-07-07"
}
```

## Postman

Import:

```txt
postman/Todo_List_Management_API.postman_collection.json
```

Collection variables:

```txt
baseUrl = http://localhost:8080
taskId = 1
```

## Design Notes

See [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md).

Key decisions:

- Use REST API to separate backend and frontend clearly.
- Use DTOs for request and response objects.
- Use service layer for business logic and normalization.
- Use JPA Specification for flexible search and filters.
- Use Flyway for repeatable database schema creation.
- Use Swagger and Postman to make reviewer testing faster.

## Submission Checklist

- Source code included.
- README included.
- Swagger enabled.
- Postman collection included.
- Database schema included.
- System design included.
- GitHub repository ready.
