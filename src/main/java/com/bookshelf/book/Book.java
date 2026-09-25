package com.bookshelf.book;

import java.time.LocalDate;

public class Book {
    private Long id;
    private String title;
    private String author;
    private String genre;
    private Integer rating;
    private BookStatus status;
    private LocalDate dateCompleted;

    public Book() {}

    public Book(Long id, String title, String author, String genre, Integer rating, BookStatus status, LocalDate dateCompleted) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.rating = rating;
        this.status = status;
        this.dateCompleted = dateCompleted;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public BookStatus getStatus() { return status; }
    public void setStatus(BookStatus status) { this.status = status; }
    public LocalDate getDateCompleted() { return dateCompleted; }
    public void setDateCompleted(LocalDate dateCompleted) { this.dateCompleted = dateCompleted; }
}
