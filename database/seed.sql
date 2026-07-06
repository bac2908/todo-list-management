USE todo_list_db;

TRUNCATE TABLE tasks;

INSERT INTO tasks (version, title, description, status, priority, due_date)
VALUES
    (0, 'Prepare README', 'Write setup steps and API documentation', 'PENDING', 'HIGH', CURRENT_DATE),
    (0, 'Build task filters', 'Support keyword, status, and priority filters', 'COMPLETED', 'MEDIUM', CURRENT_DATE),
    (0, 'Test validation cases', 'Check empty title, long title, and invalid due date', 'PENDING', 'MEDIUM', CURRENT_DATE + INTERVAL 2 DAY),
    (0, 'Create Postman collection', 'Add examples for create, update, toggle, delete, and list APIs', 'COMPLETED', 'HIGH', CURRENT_DATE + INTERVAL 1 DAY),
    (0, 'Review API error responses', 'Verify 400, 404, and 500 response formats', 'PENDING', 'HIGH', CURRENT_DATE + INTERVAL 3 DAY),
    (0, 'Polish responsive layout', 'Check desktop, tablet, and mobile screen widths', 'PENDING', 'MEDIUM', CURRENT_DATE + INTERVAL 4 DAY),
    (0, 'Document Docker setup', 'Explain how to run MySQL, backend, and frontend with Docker Compose', 'COMPLETED', 'HIGH', CURRENT_DATE + INTERVAL 1 DAY),
    (0, 'Add Swagger notes', 'Mention Swagger URL and OpenAPI JSON URL in README', 'PENDING', 'LOW', CURRENT_DATE + INTERVAL 5 DAY),
    (0, 'Check search by title', 'Search task keyword against the title field', 'COMPLETED', 'MEDIUM', CURRENT_DATE + INTERVAL 2 DAY),
    (0, 'Check search by description', 'Search task keyword against the description field', 'PENDING', 'MEDIUM', CURRENT_DATE + INTERVAL 6 DAY),
    (0, 'Verify status filter', 'Filter pending and completed tasks from frontend', 'COMPLETED', 'MEDIUM', CURRENT_DATE + INTERVAL 3 DAY),
    (0, 'Verify priority filter', 'Filter low, medium, and high priority tasks', 'PENDING', 'LOW', CURRENT_DATE + INTERVAL 7 DAY),
    (0, 'Test pagination page 1', 'Confirm first page shows eight tasks', 'PENDING', 'HIGH', CURRENT_DATE + INTERVAL 2 DAY),
    (0, 'Test pagination page 2', 'Confirm next page loads another set of tasks', 'PENDING', 'HIGH', CURRENT_DATE + INTERVAL 3 DAY),
    (0, 'Test pagination page 3', 'Confirm final page disables the next button', 'PENDING', 'HIGH', CURRENT_DATE + INTERVAL 4 DAY),
    (0, 'Clean repository before submission', 'Check git status and make sure generated folders are ignored', 'PENDING', 'MEDIUM', CURRENT_DATE + INTERVAL 5 DAY),
    (0, 'Prepare GitHub repository', 'Push source code and include the repository link in submission', 'PENDING', 'HIGH', CURRENT_DATE + INTERVAL 6 DAY),
    (0, 'Final smoke test', 'Run Docker Compose and verify frontend, backend, Swagger, and database', 'PENDING', 'HIGH', CURRENT_DATE);
