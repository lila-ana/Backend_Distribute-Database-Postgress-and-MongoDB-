require('dotenv').config();
const { createConnection } = require('typeorm');
const config = require('../config/config');
const mongoose = require('mongoose');

const { APP_MONGO_URI } = require('../config/config');

const createMongoConnection = async () => {
  try {
    const conn = await mongoose.connect(APP_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error: ', error);
    throw error;
  }
};

const createPostgresConnection = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: config.POSTGRES_HOST,
      port: config.POSTGRES_PORT,
      username: 'postgres',
      password: '778354',
      database: config.POSTGRES_DATABASE,
      entities: [__dirname + '/../models/*.js'],
      synchronize: true,
      logging: true, // Set to false in production
    });
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('PostgreSQL connection error: ', error);
    throw error;
  }
};

module.exports = {
  createMongoConnection,
  createPostgresConnection,
};
