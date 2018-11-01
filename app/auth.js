import { integrations } from '../config/';

const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(integrations.FIREBASE.ADMIN.SERVICE_ACCOUNT),
    databaseURL: integrations.FIREBASE.ADMIN.DATABASE_URL,
  });
}

const auth = admin.auth();

auth.instance = admin.auth;

export default auth;
