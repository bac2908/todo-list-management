package com.srt.todolist.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI todoListOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Todo List Management API")
                        .version("v1")
                        .description("REST API used by the Todo List React client."));
    }
}
