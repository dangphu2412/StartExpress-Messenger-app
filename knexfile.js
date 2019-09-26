const path = require('path');
require('dotenv').config();

const BASE_PATH = path.join('src', 'database');

module.exports = {
  development: {
    client: process.env.DB_CONNECTION,
    connection: { 
      host: '127.0.0.1',
      user: 'postgres', 
      database: 'mess_app',
      port: '5432',
      password: '241299'
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    }
  }, 
  production: { 
    client: process.env.DB_CONNECTION,
    connection: { 
      user: 'postgres', 
      database: 'mess_app' 
    },
    migrations: {
      directory: path.join(__dirname, BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, BASE_PATH, 'seeds'),
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN, 10),
      max: parseInt(process.env.DB_POOL_MAX, 10),
    },
  },
};

