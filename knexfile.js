module.exports = {
  development: {
    client: 'pg',
    connection: { 
      host: '127.0.0.1',
      user: 'postgres', 
      database: 'mess_app',
      port: '5432',
      password: '241299'
    },
    migrations: { 
      directory: 'src/database/migrations',
      tableName: 'migrations'
    }
  }, 
  production: { 
    client: 'pg', 
    connection: { 
      user: 'postgres', 
      database: 'mess_app' 
    }, 
  }
};
