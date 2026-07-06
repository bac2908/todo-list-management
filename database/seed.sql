USE todo_list_db;

INSERT INTO tasks (title, description, status, priority, due_date)
VALUES
    ('Prepare README', 'Write setup steps and API documentation', 'PENDING', 'HIGH', CURRENT_DATE + INTERVAL 1 DAY),
    ('Build task filters', 'Support keyword, status, and priority filters', 'COMPLETED', 'MEDIUM', CURRENT_DATE),
    ('Test validation cases', 'Check empty title, long title, and invalid due date', 'PENDING', 'MEDIUM', CURRENT_DATE + INTERVAL 2 DAY);
