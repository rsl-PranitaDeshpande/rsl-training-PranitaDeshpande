package com.bookshelf.book;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book createBook(BookRequest request) {
        Book book = new Book(null, request.title(), request.author(), request.genre(), 
                             request.rating(), request.status(), request.dateCompleted());
        return bookRepository.save(book);
    }

    public Optional<Book> getBook(Long id) {
        return bookRepository.findById(id);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> searchBooks(String query) {
        String lowerQuery = query.toLowerCase();
        return bookRepository.findAll().stream()
                .filter(b -> (b.getTitle() != null && b.getTitle().toLowerCase().contains(lowerQuery)) ||
                             (b.getAuthor() != null && b.getAuthor().toLowerCase().contains(lowerQuery)))
                .collect(Collectors.toList());
    }

    public Optional<Book> updateBook(Long id, BookRequest request) {
        return bookRepository.findById(id).map(existingBook -> {
            existingBook.setTitle(request.title());
            existingBook.setAuthor(request.author());
            existingBook.setGenre(request.genre());
            existingBook.setRating(request.rating());
            existingBook.setStatus(request.status());
            existingBook.setDateCompleted(request.dateCompleted());
            return bookRepository.save(existingBook);
        });
    }

    public boolean deleteBook(Long id) {
        if (bookRepository.findById(id).isPresent()) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
