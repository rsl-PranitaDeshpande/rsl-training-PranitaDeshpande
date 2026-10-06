# Project Instructions: Library Management System

## Naming Standards
- Use `snake_case` for all function names, method names, and variable names.
- Use `PascalCase` for all class names.

## Error Handling Standards
- Every function handling database operations, file I/O, or dictionary lookups must catch exceptions.
- Never swallow errors silently. Always return a dictionary in the strict format:
    - Success: `{"success": True, "data": <result>}`
    - Failure: `{"success": False, "error": "<error message string>"}`

## Testing Standards
- Every new function must be accompanied by a unit test function written with `pytest`.
- Place test functions in a file inside the `tests/` directory named with a `test_` prefix.
- Tests must cover at least one success case and one failure case.