package com.srt.todolist.task;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Captor
    private ArgumentCaptor<Task> taskCaptor;

    @InjectMocks
    private TaskService taskService;

    @Test
    void createTaskShouldTrimInputAndSetDefaultValues() {
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TaskRequest request = new TaskRequest(
                "  Write README  ",
                "  Add setup guide  ",
                null,
                LocalDate.now().plusDays(1)
        );

        TaskResponse response = taskService.createTask(request);

        assertThat(response.title()).isEqualTo("Write README");
        assertThat(response.description()).isEqualTo("Add setup guide");
        assertThat(response.status()).isEqualTo(TaskStatus.PENDING);
        assertThat(response.priority()).isEqualTo(TaskPriority.MEDIUM);
    }
}
