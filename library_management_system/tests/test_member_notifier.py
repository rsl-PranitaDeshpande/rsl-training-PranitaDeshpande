from datetime import datetime

from services.member_notifier import MemberNotifier


def test_member_notifier_defaults_sent_date_and_returns_notification():
    notifier = MemberNotifier("Ada Lovelace", "due-date reminder")

    result = notifier.to_dict()

    assert notifier.member_name == "Ada Lovelace"
    assert notifier.notification_type == "due-date reminder"
    assert notifier.sent_date.endswith("Z")
    datetime.fromisoformat(notifier.sent_date[:-1] + "+00:00")
    assert result == {
        "success": True,
        "data": {
            "member_name": "Ada Lovelace",
            "notification_type": "due-date reminder",
            "sent_date": notifier.sent_date,
        },
    }


def test_member_notifier_returns_failure_for_invalid_sent_date():
    notifier = MemberNotifier("Ada Lovelace", "overdue notice", "not-a-date")

    result = notifier.to_dict()

    assert result["success"] is False
    assert "error" in result
