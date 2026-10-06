import pytest

from models.publisher import Publisher


def test_publisher_initializes_and_serializes():
    publisher = Publisher("Penguin Books", "80 Strand, London")

    assert publisher.name == "Penguin Books"
    assert publisher.publisher_id
    assert publisher.address == "80 Strand, London"
    assert publisher.to_dict() == {
        "name": "Penguin Books",
        "publisher_id": publisher.publisher_id,
        "address": "80 Strand, London",
    }


def test_publisher_preserves_provided_id():
    publisher = Publisher("Penguin Books", "80 Strand, London", "publisher-1")

    assert publisher.publisher_id == "publisher-1"


@pytest.mark.parametrize(
    ("name", "address", "publisher_id"),
    [
        (" ", "80 Strand, London", "publisher-1"),
        ("Penguin Books", " ", "publisher-1"),
        ("Penguin Books", "80 Strand, London", " "),
    ],
)
def test_publisher_rejects_blank_required_fields(name, address, publisher_id):
    with pytest.raises(ValueError):
        Publisher(name, address, publisher_id)
