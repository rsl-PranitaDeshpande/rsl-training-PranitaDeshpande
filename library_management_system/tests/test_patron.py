from datetime import datetime

import pytest

from models.patron import Patron


def test_patron_generates_id_and_utc_membership_date():
    patron = Patron("Ada Lovelace")

    assert patron.name == "Ada Lovelace"
    assert patron.patron_id
    assert patron.membership_date.endswith("Z")
    datetime.fromisoformat(patron.membership_date[:-1] + "+00:00")


@pytest.mark.parametrize(
    ("name", "patron_id", "membership_date"),
    [
        (" ", "patron-1", "2026-10-06T00:00:00Z"),
        ("Ada Lovelace", " ", "2026-10-06T00:00:00Z"),
        ("Ada Lovelace", "patron-1", "not-a-date"),
        ("Ada Lovelace", "patron-1", "2026-10-06T00:00:00+00:00"),
    ],
)
def test_patron_rejects_invalid_required_fields(name, patron_id, membership_date):
    with pytest.raises(ValueError):
        Patron(name, patron_id, membership_date)
