const admin = require('firebase-admin');
const serviceAccount = require('../firebase-key.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const auth = admin.auth();

auth.instance = admin.auth;

export default auth;
