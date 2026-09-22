# Task 1 Audit Report: Pre-Prompt Code Sanitization

Quick breakdown of the security audit performed on `legacyDbConnector.js` before sending any code to an AI assistant for refactoring.

## What Was Leaked in the Original Code?

Scanning the legacy file revealed 4 hardcoded credentials/PII instances (Red Data):

1. **Database URI & Credentials:** 
   `mongodb://admin:P@ssword123!@db.internal.company.com:27017/prod_db`
   * *Issue:* Exposes internal network hostnames, admin username, and plaintext password directly in source control.

2. **Stripe Secret API Key:** 
   `sk_live_REDACTED_STRIPE_KEY_XYZ`
   * *Issue:* A live production API key. Anyone with access could perform unauthorized financial transactions or pull account data.

3. **Internal Authorization Token:** 
   `secret_bearer_token_998811`
   * *Issue:* Static admin token that bypasses service authorization checks.

4. **Hardcoded Customer PII:** 
   `john.doe@company.com` and `+1-555-0199`
   * *Issue:* Real customer contact info embedded directly in code logic, violating basic privacy standards (GDPR/CCPA).

---

## How it Was Fixed

* **Moved secrets to environment variables:** Replaced hardcoded connection strings and keys with `process.env` calls inside `dbConnector.js`.
* **Added template config:** Created `.env.example` so setup parameters are clear without leaking real values.
* **Modernized logic:** Rewrote callback-heavy code using `async/await` and parameterized database queries to make it safer and cleaner.
* **Updated `.gitignore`:** Added `.env` to prevent accidental secret commits going forward.