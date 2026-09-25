# BookShelf API

## Setup
Requires Java 17 and Maven.

```bash
mvn spring-boot:run
```

## API
- POST /api/books: Create a book
- GET /api/books: List all books (optional status param)
- GET /api/books/{id}: Get a book by ID
- PUT /api/books/{id}: Update a book
- DELETE /api/books/{id}: Delete a book
- GET /api/books/stats: Get statistics
