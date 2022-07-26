import { buffer } from "micro";
import * as admin from "firebase-admin";

console.log("webhook")

// Secure a connection to FIREBASE from the backend
const serviceAccount = {
  "type": process.env.FIRESTORE_ADMIN_TYPE,
  "project_id": process.env.FIRESTORE_ADMIN_PROJECT_ID,
  "private_key_id": process.env.FIRESTORE_ADMIN_PRIVATE_KEY_ID,
  "private_key": process.env.FIRESTORE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIRESTORE_ADMIN_CLIENT_EMAIL,
  "client_id": process.env.FIRESTORE_ADMIN_CLIENT_ID,
  "auth_uri": process.env.FIRESTORE_ADMIN_AUTH_UR,
  "token_uri": process.env.FIRESTORE_ADMIN_TOKEN_URL,
  "auth_provider_x509_cert_url": process.env.FIRESTORE_ADMIN_AUTH_CERT_URL,
  "client_x509_cert_url": process.env.FIRESTORE_ADMIN_CLIENT_CERT_URL
}

const app = !admin.apps.length
  ? admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
  })
  : admin.app();
// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    return app
        .firestore()
        .collection("customers")
        .doc(session.metadata.email)
        .collection("orders")
        .doc(session.id)
        .set({
            images: JSON.parse(session.metadata.images), 
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer;
    const sig = req.headers["stripe-signature"];

    let event;
    // Verify that the EVENT posted came from stripe
    try{
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Fulfill the order...
      return fulfillOrder(session)
        .then(() => res.status(200).send())
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
    res.status(200).send();
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};