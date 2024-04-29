const { ConnectionManager, getConnection } = require('typeorm');
const dbConfig = require('../config/config');

// Create a connection manager
const connectionManager = new ConnectionManager();

// Function to create a MongoDB connection
const createMongoConnection = async () => {
  const mongoConfig = {
    type: 'mongodb',
    url: dbConfig.mongodb.uri,
    database: dbConfig.mongodb.dbName,
    synchronize: true,
    entities: [users],
    // Other MongoDB options as needed
  };

  return await connectionManager.create(mongoConfig).connect();
};

// Function to create a PostgreSQL connection
const createPostgresConnection = async () => {
  const postgresConfig = {
    type: 'postgres',
    host: dbConfig.postgres.host,
    port: dbConfig.postgres.port,
    username: dbConfig.postgres.userName,
    password: dbConfig.postgres.password,
    database: dbConfig.postgres.database,
    entities: [
      // Add your PostgreSQL entity classes here
    ],
    synchronize: true, // Set to true for development, false for production
  };

  return await connectionManager.create(postgresConfig).connect();
};

// Function to get the existing PostgreSQL connection
const getPostgresConnection = () => {
  return getConnection('default'); // Assuming you've named your PostgreSQL connection 'default'
};

module.exports = {
  createMongoConnection,
  createPostgresConnection,
  getPostgresConnection,
};
