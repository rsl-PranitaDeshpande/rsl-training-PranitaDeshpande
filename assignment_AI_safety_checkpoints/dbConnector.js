/**
 * Task 1: Pre-Prompt Sanitized Database Connector
 * Safe for AI prompting, uses environment variables and async/await.
 */

const { MongoClient } = require('mongodb');
const Stripe = require('stripe');

// Read sensitive configurations securely from environment variables
const dbUri = process.env.DATABASE_URI;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const adminBearerToken = process.env.INTERNAL_ADMIN_TOKEN;

// Fail-safe check to prevent execution if environment variables are omitted
if (!dbUri || !stripeSecretKey) {
  throw new Error("SECURITY FAULT: DATABASE_URI and STRIPE_SECRET_KEY environment variables must be defined.");
}

const stripe = Stripe(stripeSecretKey);

/**
 * Asynchronously synchronizes user details without hardcoding PII or credentials.
 * @param {Object} userDetails - Dynamic object containing non-hardcoded user attributes
 */
async function syncUserData(userDetails) {
  const client = new MongoClient(dbUri);

  try {
    // 1. Establish asynchronous database connection
    await client.connect();
    const database = client.db();
    const usersCollection = database.collection('users');

    // 2. Synchronize external payment gateway customer record using dynamic inputs
    const stripeCustomer = await stripe.customers.create({
      email: userDetails.email,
      name: userDetails.name,
    });

    // 3. Execute parameterized database update
    const filter = { userId: userDetails.userId };
    const updateDoc = {
      $set: {
        stripeCustomerId: stripeCustomer.id,
        updatedAt: new Date(),
      },
    };

    const result = await usersCollection.updateOne(filter, updateDoc);
    return { success: true, modifiedCount: result.modifiedCount };

  } catch (error) {
    // Log safe generic error messages without exposing raw connection strings
    console.error("Error executing safe user data sync:", error.message);
    throw error;
  } finally {
    // Ensure connection is cleanly released
    await client.close();
  }
}

module.exports = { syncUserData };