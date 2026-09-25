package com.bookshelf.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record BookRequest(
    @NotBlank(message = "Title is required")
    String title,
    @NotBlank(message = "Author is required")
    String author,
    String genre,
    Integer rating,
    @NotNull(message = "Status is required")
    BookStatus status,
    LocalDate dateCompleted
) {}
