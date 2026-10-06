---
applyTo: "library_management_system/src/services/**"
---
# Rules for Services Directory

1. Service classes MUST NOT include internal `validate()` methods or raise raw `ValueError` exceptions.
2. Service classes MUST return status dictionaries in the standard format `{"success": True, "data": ...}` or `{"success": False, "error": "..."}`.
3. Every public service method MUST catch exceptions and wrap them in a failing response dictionary.