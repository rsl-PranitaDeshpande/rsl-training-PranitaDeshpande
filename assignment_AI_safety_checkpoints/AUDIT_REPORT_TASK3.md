# Task 3 Audit Report: Automated Pre-Commit Safety Gate

## Overview
To ensure raw credentials, API keys, and sensitive tokens are never committed to GitHub by human error or AI assistant generation, an automated **Git Pre-Commit Hook** was configured at `.githooks/pre-commit`.

---

## Configuration Details
* **Hook File Path:** `.githooks/pre-commit`
* **Git Core Configuration:** `git config core.hooksPath .githooks`
* **Pattern Detection Rules:**
  - Stripe / Third-Party Secret Keys (`sk_live_...`)
  - Database URI Strings containing embedded passwords (`mongodb://user:pass@host`)
  - Private Keys (`-----BEGIN PRIVATE KEY-----`)
  - Hardcoded Weak JWT Secrets (`super-secret-key-...`)

---

## Testing & Verification
A security test was conducted by attempting to commit a mock secret (`sk_live_...`). 

### Test Output Log:
```text
Running AI Safety Checkpoint Pre-Commit Audit...
SECURITY ALERT: Potential secret detected in assignment_AI_safety_checkpoints/dbConnector.js!
1:const leakedKey = "sk_live_EXAMPLE_REDACTED_KEY_XXXXX";
--------------------------------------------------------
COMMIT BLOCKED: Please remove raw secrets or move them
to environment variables (.env) before committing.
--------------------------------------------------------