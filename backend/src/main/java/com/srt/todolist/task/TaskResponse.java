package com.srt.todolist.task;

import java.time.Instant;
import java.time.LocalDate;

public record TaskResponse(
        Long id,
        Long version,
        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        LocalDate dueDate,
        Instant createdAt,
        Instant updatedAt
) {
}
