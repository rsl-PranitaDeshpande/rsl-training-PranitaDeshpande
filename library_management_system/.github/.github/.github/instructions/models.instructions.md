---
applyTo: "library_management_system/src/models/**"
---
# Rules for Data Models Directory

1. Every model class MUST include a `validate()` method that raises a `ValueError` if any required field is empty or invalid.
2. Every model class MUST include type annotations for all attributes in `__init__`.
3. Datetime fields MUST be formatted strictly as UTC ISO strings ending with `Z`.