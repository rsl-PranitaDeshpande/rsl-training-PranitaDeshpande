from datetime import datetime, timezone
from typing import Dict, Optional


class MemberNotifier:
    def __init__(
        self,
        member_name: str,
        notification_type: str,
        sent_date: Optional[str] = None,
    ):
        self.member_name: str = member_name
        self.notification_type: str = notification_type
        self.sent_date: str = sent_date or (
            datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        )

    def to_dict(self) -> Dict[str, object]:
        try:
            if not isinstance(self.member_name, str) or not self.member_name.strip():
                return {"success": False, "error": "Member name must be a non-empty string."}
            if (
                not isinstance(self.notification_type, str)
                or not self.notification_type.strip()
            ):
                return {
                    "success": False,
                    "error": "Notification type must be a non-empty string.",
                }
            if not isinstance(self.sent_date, str) or not self.sent_date.endswith("Z"):
                return {
                    "success": False,
                    "error": "Sent date must be a UTC ISO string ending with 'Z'.",
                }

            datetime.fromisoformat(self.sent_date[:-1] + "+00:00")
            return {
                "success": True,
                "data": {
                    "member_name": self.member_name,
                    "notification_type": self.notification_type,
                    "sent_date": self.sent_date,
                },
            }
        except (AttributeError, TypeError, ValueError) as error:
            return {"success": False, "error": str(error)}
