const MongoClient = require('mongodb').MongoClient;
const Stripe = require('stripe');

// Legacy function connecting to DB and creating a Stripe customer
const dbUri = "mongodb://admin:P@ssword123!@db.internal.company.com:27017/prod_db";
const stripe = Stripe('sk_live_REDACTED_STRIPE_KEY_XYZ');
const ADMIN_BEARER_TOKEN = "secret_bearer_token_998811";

function syncUserDataLegacy(callback) {
  const userEmail = "john.doe@company.com";
  const userPhone = "+1-555-0199";

  MongoClient.connect(dbUri, function(err, client) {
    if (err) return callback(err);
    const db = client.db("prod_db");
    
    stripe.customers.create({ email: userEmail, phone: userPhone }, function(stripeErr, customer) {
      if (stripeErr) return callback(stripeErr);
      
      db.collection("users").updateOne(
        { email: userEmail },
        { $set: { stripeId: customer.id } },
        function(updateErr, result) {
          client.close();
          if (updateErr) return callback(updateErr);
          callback(null, result);
        }
      );
    });
  });
}

module.exports = { syncUserDataLegacy };