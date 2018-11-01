import session from 'express-session';

import config from '../../config/';

export const expressSession = session({
  secret: config.app.SECRET,
  rolling: true,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    secure: process.env.NODE_ENV === 'production',
  },
});
