from typing import Dict, List, Optional
from models.book import Book
from models.member import Member


def _canonicalize_isbn(isbn: str) -> str:
    normalized_isbn = isbn.replace("-", "").replace(" ", "").upper()

    if len(normalized_isbn) == 10:
        if not normalized_isbn[:9].isascii() or not normalized_isbn[:9].isdigit() or not (
            normalized_isbn[9].isascii()
            and normalized_isbn[9].isdigit()
            or normalized_isbn[9] == "X"
        ):
            raise ValueError("ISBN must contain 10 or 13 valid ISBN characters.")

        digits = [int(character) for character in normalized_isbn[:9]]
        check_digit = 10 if normalized_isbn[9] == "X" else int(normalized_isbn[9])
        checksum = sum(
            digit * weight for digit, weight in zip(digits, range(10, 1, -1))
        ) + check_digit
        if checksum % 11:
            raise ValueError("ISBN-10 checksum is invalid.")

        isbn13_prefix = f"978{normalized_isbn[:9]}"
        prefix_checksum = sum(
            int(digit) * (1 if index % 2 == 0 else 3)
            for index, digit in enumerate(isbn13_prefix)
        )
        check_digit_13 = (10 - prefix_checksum % 10) % 10
        return f"{isbn13_prefix}{check_digit_13}"

    if (
        len(normalized_isbn) != 13
        or not normalized_isbn.isascii()
        or not normalized_isbn.isdigit()
    ):
        raise ValueError("ISBN must contain 10 or 13 valid ISBN characters.")
    if not normalized_isbn.startswith(("978", "979")):
        raise ValueError("ISBN-13 must start with 978 or 979.")

    checksum = sum(
        int(digit) * (1 if index % 2 == 0 else 3)
        for index, digit in enumerate(normalized_isbn)
    )
    if checksum % 10:
        raise ValueError("ISBN-13 checksum is invalid.")

    return normalized_isbn


class LibraryManager:
    def __init__(self):
        # In-memory "databases"
        self.books: Dict[str, Book] = {}
        self.members: Dict[str, Member] = {}
        self.daily_fine_rate: float = 50

    def add_book(self, book: Book) -> None:
        self.books[book.book_id] = book

    def register_member(self, member: Member) -> None:
        self.members[member.member_id] = member

    def checkout_book(self, member_id: str, book_id: str) -> None:
        member = self.members.get(member_id)
        book = self.books.get(book_id)

        if not member or not book:
            raise ValueError("Invalid member ID or book ID.")
        
        if member.accumulated_fines > 250:
            raise PermissionError("Cannot borrow books with outstanding fines over 250₹.")

        book.check_out()
        member.borrow_book(book_id)

    def process_return(self, member_id: str, book_id: str) -> None:
        member = self.members.get(member_id)
        book = self.books.get(book_id)

        if not member or not book:
            raise ValueError("Invalid member ID or book ID.")

        if book.is_overdue():
            # Flat fine for simplicity, but could be calculated by days overdue
            member.add_fine(self.daily_fine_rate * 5) 

        book.return_book()
        member.return_book(book_id)

    def search_books_by_author(self, author_name: str) -> List[Book]:
        return [book for book in self.books.values() if author_name.lower() in book.author.lower()]

    def search_book_by_isbn(self, isbn: str) -> Dict[str, object]:
        """Find a book by ISBN, returning a result that describes success or failure."""
        if not isinstance(isbn, str) or not isbn.strip():
            return {"success": False, "error": "ISBN must be a non-empty string."}

        try:
            canonical_isbn = _canonicalize_isbn(isbn)
        except ValueError as error:
            return {"success": False, "error": str(error)}

        try:
            for book in self.books.values():
                try:
                    stored_isbn = book.isbn
                    if stored_isbn and _canonicalize_isbn(stored_isbn) == canonical_isbn:
                        return {"success": True, "data": book}
                except (AttributeError, TypeError, ValueError):
                    continue
        except (AttributeError, RuntimeError, TypeError) as error:
            return {"success": False, "error": f"Unable to search the catalog: {error}"}

        return {"success": False, "error": f"No book found for ISBN '{isbn}'."}
