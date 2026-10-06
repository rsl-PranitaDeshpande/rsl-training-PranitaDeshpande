import uuid
from datetime import datetime, timezone
from typing import Optional


class Patron:
    def __init__(
        self,
        name: str,
        patron_id: Optional[str] = None,
        membership_date: Optional[str] = None,
    ):
        self.name: str = name
        self.patron_id: str = patron_id or str(uuid.uuid4())
        self.membership_date: str = membership_date or (
            datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        )
        self.validate()

    def validate(self) -> None:
        if not isinstance(self.name, str) or not self.name.strip():
            raise ValueError("Patron name must be a non-empty string.")
        if not isinstance(self.patron_id, str) or not self.patron_id.strip():
            raise ValueError("Patron ID must be a non-empty string.")
        if (
            not isinstance(self.membership_date, str)
            or not self.membership_date.endswith("Z")
        ):
            raise ValueError("Membership date must be a UTC ISO string ending with 'Z'.")

        try:
            membership_datetime = datetime.fromisoformat(
                self.membership_date[:-1] + "+00:00"
            )
        except ValueError as error:
            raise ValueError("Membership date must be a valid UTC ISO string.") from error

        if membership_datetime.utcoffset() != timezone.utc.utcoffset(None):
            raise ValueError("Membership date must use UTC.")
