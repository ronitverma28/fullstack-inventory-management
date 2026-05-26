package com.ronit.inventory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(
                new Info().title("Full Stack Inventory Management")
                        .version("1.0")
                        .description("API documentation of Inventory Management System")
                        .contact(new Contact()
                                .email("ronitroy22678@gmail.com")
                                .name("Ronit Verma")
                                .url("https://ronit-verma-portfolio.vercel.app/")));
    }
}
