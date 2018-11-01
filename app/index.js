require('dotenv').config();
require('es6-promise').polyfill();
require('isomorphic-fetch');

import path from 'path';
import cors from 'cors';
import raven from 'raven';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes/';
import { handle404, handleError } from './middlewares/';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.set('env', process.env.NODE_ENV);

// Initialize Sentry
if (isProduction) {
  raven.config(process.env.SENTRY_DSN).install();
  app.use(raven.requestHandler());
}

// middlewares
app.use(compression());
app.use(morgan('tiny'));
app.use(
  cors({
    origin: '*',
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// serve static files
app.use('/public', express.static('public'));

// routes
app.use('/', routes);

// error handlers
if (isProduction) {
  app.use(raven.errorHandler());
}
app.use(handle404);
app.use(handleError);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
