require('dotenv').config();

import path from 'path';
import cors from 'cors';
import raven from 'raven';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes/';
import config from '../config/';
import { handle404, handleError } from './middlewares/';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.set('env', process.env.NODE_ENV);

// Initialize Sentry
if (isProduction) {
  raven.config(config.integrations.SENTRY.DSN).install();
  app.use(raven.requestHandler());
}

// middlewares
app.use(compression());
app.use(morgan('tiny'));
app.use(cors(config.app.CORS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// serve static files
app.use('/public', express.static('public'));

// routes
app.get('/', routes);

// error handlers
if (isProduction) {
  app.use(Raven.errorHandler());
}
app.use(handle404);
app.use(handleError);

// start server
app.listen(config.app.PORT, () => console.log(`Server running at http://localhost:${config.app.PORT}/`));
