import uuid
from typing import Dict, Optional


class Publisher:
    def __init__(
        self,
        name: str,
        address: str,
        publisher_id: Optional[str] = None,
    ):
        self.name: str = name
        self.publisher_id: str = publisher_id or str(uuid.uuid4())
        self.address: str = address
        self.validate()

    def validate(self) -> None:
        if not isinstance(self.name, str) or not self.name.strip():
            raise ValueError("Publisher name must be a non-empty string.")
        if not isinstance(self.publisher_id, str) or not self.publisher_id.strip():
            raise ValueError("Publisher ID must be a non-empty string.")
        if not isinstance(self.address, str) or not self.address.strip():
            raise ValueError("Publisher address must be a non-empty string.")

    def to_dict(self) -> Dict[str, str]:
        return {
            "name": self.name,
            "publisher_id": self.publisher_id,
            "address": self.address,
        }
