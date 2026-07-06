package com.srt.todolist.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
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
                        .description("REST API for managing todo tasks")
                        .license(new License().name("Intern Developer Test")));
    }
}
