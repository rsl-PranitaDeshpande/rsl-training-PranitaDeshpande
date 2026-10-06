from datetime import datetime, timezone
from typing import Optional


class PatronNotifier:
    def __init__(
        self,
        patron_name: str,
        notification_type: str,
        sent_date: Optional[str] = None,
    ):
        self.patron_name: str = patron_name
        self.notification_type: str = notification_type
        self.sent_date: str = sent_date or (
            datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        )
        self.validate()

    def validate(self) -> None:
        if not isinstance(self.patron_name, str) or not self.patron_name.strip():
            raise ValueError("Patron name must be a non-empty string.")
        if (
            not isinstance(self.notification_type, str)
            or not self.notification_type.strip()
        ):
            raise ValueError("Notification type must be a non-empty string.")
        if not isinstance(self.sent_date, str) or not self.sent_date.endswith("Z"):
            raise ValueError("Sent date must be a UTC ISO string ending with 'Z'.")

        try:
            sent_datetime = datetime.fromisoformat(self.sent_date[:-1] + "+00:00")
        except ValueError as error:
            raise ValueError("Sent date must be a valid UTC ISO string.") from error

        if sent_datetime.utcoffset() != timezone.utc.utcoffset(None):
            raise ValueError("Sent date must use UTC.")
