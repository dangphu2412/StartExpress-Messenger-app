import express from 'express';
import 'dotenv/config';

import initConfig from './config/init';
import dbConfig from './config/db';

import errorHandler from './errors/errorsHandler';

const app = express();

// Config necessary packages
initConfig(app);

// Setup Database connection with MongoDB
dbConfig();

// Error handler
errorHandler(app);

export default app;
