import express from 'express';
import http from 'http';
import 'dotenv/config';
import session from 'express-session';
import pgConnect from 'connect-pg-simple';

import socket from './config/socket';
import initConfig from './config/init';
import dbConfig from './config/db';

import errorHandler from './errors/errorsHandler';

const app = express();
const server = http.createServer(app);

const PgSession = pgConnect(session);
const pgStoreConfig = {
  conString: process.env.DATABASE_URL,
};
const sessionOptions = {
  store: new PgSession(pgStoreConfig),
  secret: 'jW8aor76jpPX', // session secret
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
};

app.use(session(sessionOptions));

// Config necessary packages
initConfig(app);

// Config setup connect with socket
socket(server);

// Setup Database connection with MongoDB
dbConfig();

// Error handler
errorHandler(app);

export default { app, server };
