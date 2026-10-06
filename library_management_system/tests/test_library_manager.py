import pytest

from models.book import Book
from services.library_manager import LibraryManager


@pytest.fixture
def library_with_book():
    library = LibraryManager()
    book = Book("The Three-Body Problem", "Liu Cixin", 2008, "978-7-5502-0355-6")
    library.add_book(book)
    return library, book


def test_search_book_by_isbn_finds_formatted_isbn(library_with_book):
    library, book = library_with_book

    result = library.search_book_by_isbn("9787550203556")

    assert result == {"success": True, "data": book}


def test_search_book_by_isbn_accepts_isbn10_equivalent(library_with_book):
    library, book = library_with_book

    result = library.search_book_by_isbn("7-5502-0355-5")

    assert result == {"success": True, "data": book}


@pytest.mark.parametrize("isbn", ["", "not-an-isbn", "9780143127742", None])
def test_search_book_by_isbn_reports_invalid_input(library_with_book, isbn):
    library, _ = library_with_book

    result = library.search_book_by_isbn(isbn)

    assert result["success"] is False
    assert "error" in result


def test_search_book_by_isbn_reports_missing_book(library_with_book):
    library, _ = library_with_book

    result = library.search_book_by_isbn("9780143127741")

    assert result["success"] is False
    assert "No book found" in result["error"]
