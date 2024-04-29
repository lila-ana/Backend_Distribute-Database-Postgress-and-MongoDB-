const express = require('express');
const config = require('./config/config');
const logger = require('./config/logger');
const { createMongoConnection, createPostgresConnection } = require('./utils/createDatabaseConnection');
const userRoutes = require('./routes/v1/user.route'); // Adjust the path as needed
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', userRoutes);

const startServer = async () => {
  try {
    await Promise.all([createMongoConnection(), createPostgresConnection()]);
    app.listen(config.APP_PORT, () => {
      logger.info(`Server listening on port ${config.APP_PORT}`);
    });
  } catch (error) {
    logger.error('Error starting server: ', error);
    process.exit(1);
  }
};

startServer();
