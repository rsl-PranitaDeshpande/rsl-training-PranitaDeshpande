# Task 2 Audit Report: AI Code Review & Security Bugs

We asked an AI assistant to write user login and profile code for our app (`auth.js`). 

The code works when you run it, but it has **4 big security mistakes**. If we push this code to production, hackers could easily bypass login, steal customer data, or view other people's private profiles.

Here is a simple breakdown of what went wrong and how to fix it.

---

## The 4 Security Bugs Found in the Code

### 1. Fake Login Trick (NoSQL Injection)
* **Where it is:** Line 8 in `routes/auth.js` (`db.users.findOne({ username: username, password: password })`)
* **What's wrong:** The code takes whatever the user types in the login form and sends it straight to the database.
* **Why it's dangerous:** A hacker doesn't need to know a password. They can send a trick command like `{"$ne": null}` (which means "username is not empty"). The database thinks that is true and logs the hacker in as the very first user in the database (usually an Admin).
* **How to fix it:** Always check that the input is a plain text string before passing it to the database, or use an input verification tool like `zod` or `joi`.

---

### 2. Leaking Secrets & Forever Tokens (Weak JWT Setup)
* **Where it is:** Line 15 in `routes/auth.js` (`jwt.sign(..., 'super-secret-key-123')`)
* **What's wrong:** Two problems here:
  1. The secret key `'super-secret-key-123'` is written right inside the code for anyone to see on GitHub.
  2. The digital pass (JWT token) created for the user **never expires**.
* **Why it's dangerous:** Anyone who reads our code on GitHub can use that secret key to forge fake admin tokens. Also, if a hacker steals a user's token once, they can use it forever.
* **How to fix it:** Store the secret key in an environment variable (`process.env.JWT_SECRET`) and set an expiration time (for example, `expiresIn: '1h'`).

---

### 3. Oversharing User Data (PII Data Leak)
* **Where it is:** Line 20 in `routes/auth.js` (`user: user` inside `res.json()`)
* **What's wrong:** When someone logs in, the app sends back the entire database user object to the browser.
* **Why it's dangerous:** This sends back hidden fields the browser never needs—like hashed passwords, reset tokens, and private personal details. Anyone opening the browser developer tools can read this info.
* **How to fix it:** Only return public, safe fields like `id`, `name`, and `email`. Never send the whole database object.

---

### 4. Viewing Anyone's Account (BOLA / IDOR)
* **Where it is:** Line 26 in `routes/auth.js` (`const userId = req.query.id`)
* **What's wrong:** The `/profile` page loads account details based solely on whatever ID is typed in the web address (`/profile?id=123`).
* **Why it's dangerous:** There is no check to see if the logged-in user actually owns that profile. A user with ID `101` can change the URL to `?id=102` and view someone else's personal information.
* **How to fix it:** Do not trust the ID in the URL. Read the user ID directly from the logged-in user's secure token (`req.user.id`).

---

## Final Decision
**DO NOT MERGE THIS PR.** 

The AI wrote code that looks good on the outside, but it left out basic security protection. The developer must fix all 4 issues before we can approve this code.

---

## Remediation & Fixed Implementation Summary

All 4 findings have been remediated in `assignment_AI_safety_checkpoints/auth.js`:

1. **NoSQL Injection Prevented:** Enforced strict string checking (`typeof === 'string'`) on `username` and `password` inputs.
2. **JWT Hardcoding & Expiry Fixed:** Switched token signing key to `process.env.JWT_SECRET` and enforced a 1-hour expiration limit (`expiresIn: '1h'`).
3. **Data Leakage Prevented:** Created a explicit `safeUser` projection containing only non-sensitive fields (`id`, `username`, `email`, `role`).
4. **BOLA / IDOR Eliminated:** Bound profile lookups strictly to the authenticated identity attached to the request session (`req.user.id`).

**Updated Status:** Approved for merge pending Task 3 safety hook implementation.