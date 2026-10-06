---
name: add-model-feature
description: Standardized procedure to scaffold a new data model entity and its unit test suite in the library system.
---

# Add New Data Model Skill

When tasked with adding a new domain entity or data model to the library system, execute the following steps in order without asking for further clarification:

1. **Create Model File** at `library_management_system/src/models/<model_name>.py`:
    - Use `PascalCase` for class name and `snake_case` for module file name.
    - Include strict type annotations on all `__init__` parameters.
    - Assign auto-generated `str(uuid.uuid4())` for missing ID fields.
    - Implement `validate()` method that raises `ValueError` if required fields are blank/invalid.
    - Implement `to_dict()` returning a primitive dictionary representation.

2. **Create Unit Test Suite** at `library_management_system/tests/test_<model_name>.py`:
    - Import `pytest`.
    - Add test functions covering valid initialization and `to_dict()` output.
    - Add `@pytest.mark.parametrize` tests checking that `validate()` raises `ValueError` on invalid inputs.

3. Ensure both files adhere strictly to PEP 8 standard formatting and pass type checks.