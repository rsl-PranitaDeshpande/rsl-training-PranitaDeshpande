from datetime import datetime

import pytest

from services.patron_notifier import PatronNotifier


def test_patron_notifier_sets_attributes_and_utc_sent_date():
    notifier = PatronNotifier("Ada Lovelace", "due-date reminder")

    assert notifier.patron_name == "Ada Lovelace"
    assert notifier.notification_type == "due-date reminder"
    assert notifier.sent_date.endswith("Z")
    datetime.fromisoformat(notifier.sent_date[:-1] + "+00:00")


def test_patron_notifier_preserves_provided_sent_date():
    sent_date = "2026-10-06T06:49:00Z"

    notifier = PatronNotifier("Ada Lovelace", "overdue notice", sent_date)

    assert notifier.sent_date == sent_date


@pytest.mark.parametrize(
    ("patron_name", "notification_type", "sent_date"),
    [
        (" ", "reminder", "2026-10-06T00:00:00Z"),
        ("Ada Lovelace", " ", "2026-10-06T00:00:00Z"),
        ("Ada Lovelace", "reminder", "not-a-date"),
        ("Ada Lovelace", "reminder", "2026-10-06T00:00:00+00:00"),
    ],
)
def test_patron_notifier_rejects_invalid_attributes(
    patron_name, notification_type, sent_date
):
    with pytest.raises(ValueError):
        PatronNotifier(patron_name, notification_type, sent_date)
