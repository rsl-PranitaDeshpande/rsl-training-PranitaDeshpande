const express = require('express');
const router = express.Router();
const db = require('../dbConnector');
const jwt = require('jsonwebtoken');

/**
 * Secure Login Route
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Fix 1: Ensure inputs are explicit strings to block NoSQL Operator Injection
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid input format' });
  }

  const user = await db.users.findOne({ username, password });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Fix 2: Read secret from environment variables and set a 1-hour token expiration
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('SECURITY FAULT: JWT_SECRET environment variable is missing.');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    jwtSecret,
    { expiresIn: '1h' }
  );

  // Fix 3: Sanitize output to prevent leaking password hashes or internal fields
  const safeUser = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  };

  res.status(200).json({
    message: 'Login successful',
    token: token,
    user: safeUser
  });
});

/**
 * Secure Profile Route
 */
router.get('/profile', async (req, res) => {
  // Fix 4: Derive identity from authenticated session token (req.user) rather than untrusted query params
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const profile = await db.users.findOne(
    { _id: req.user.id },
    { projection: { password: 0 } } // Exclude sensitive fields
  );

  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  res.json(profile);
});

module.exports = router;