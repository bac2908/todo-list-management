package com.srt.todolist.task;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TaskRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 120, message = "Title must be at most 120 characters")
        String title,

        @Size(max = 500, message = "Description must be at most 500 characters")
        String description,

        TaskPriority priority,

        @FutureOrPresent(message = "Due date must be today or in the future")
        LocalDate dueDate
) {
}
