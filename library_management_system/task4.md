# Task 4: Diagnosis and Refinement Summary

## Overview
In Task 4, we reviewed the output generated from our earlier tasks, identified three specific issues where Copilot broke our coding standards, diagnosed why each issue happened, and refined our configuration files to fix them.

---

## Issue 1: Folder Rule Spill-Over (Leak in Services Folder)

### What Went Wrong
When we asked Copilot to create a helper class inside the `src/services/` directory (`patron_notifier.py`), it added a `validate()` method that raised a `ValueError`. This rule was only supposed to apply to files inside `src/models/`.

### Diagnosis
The rule file `.github/instructions/models.instructions.md` told Copilot what to do inside the `models/` directory, but it didn't explicitly tell Copilot **NOT** to use `validate()` inside `services/`. Because of this, the rule leaked into other folders.

### The Fix
We created a new folder rule file `.github/instructions/services.instructions.md` with explicit negative constraints:
> *"Service classes MUST NOT include internal `validate()` methods or raise raw `ValueError` exceptions. They MUST return status dictionaries like `{"success": True/False, ...}`."*

### Re-Run Result
When we re-ran the prompt to create `src/services/member_notifier.py`, Copilot completely removed the `validate()` method and successfully used dictionary return values instead!

---

## Issue 2: Missing PYTHONPATH Cause Test Runner Failure

### What Went Wrong
When running `pytest` in the terminal, execution failed with `ModuleNotFoundError: No module named 'models'`, even though the test code itself was correct.

### Diagnosis
Our main project instructions file (`.github/copilot-instructions.md`) instructed Copilot to create unit tests using `pytest`, but did not specify that the `src` folder needs to be added to Python's search path when executing terminal commands.

### The Fix
We updated `.github/copilot-instructions.md` to specify the exact command required to run tests on macOS/Linux terminal environments:
```bash
PYTHONPATH=library_management_system/src pytest library_management_system/tests