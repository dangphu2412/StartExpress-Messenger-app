#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http';
import debugLib from 'debug';
import app from '../app';

const debug = debugLib('messenger:server');
/**
 * Get port from environment and store in Express.
 */

const APP_PORT = normalizePort(process.env.PORT || '3000');
app.set('port', APP_PORT);

/**
 * Create HTTP server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */
const server = http.createServer(app);

server.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const PORT = parseInt(val, 10);

  if (isNaN(PORT)) {
    // named pipe
    return val;
  }

  if (PORT >= 0) {
    // port number
    return PORT;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${APP_PORT}`
    : `Port ${APP_PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
