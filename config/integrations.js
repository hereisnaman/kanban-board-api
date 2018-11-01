const serviceAccount = require('./firebase-key.json');

export default {
  SENTRY: {
    DSN: process.env.SENTRY_DSN,
  },
  FIREBASE: {
    ADMIN: {
      DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      SERVICE_ACCOUNT: serviceAccount,
    },
  },
};
