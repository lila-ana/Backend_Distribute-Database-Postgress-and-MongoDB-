const { createConnection } = require('typeorm');
const { User, Voluntery } = require('../models');

let connection;

// Initialize the connection
createConnection()
  .then((conn) => {
    connection = conn;
    const userRepository = connection.getRepository(User);
    const volunteryRepository = connection.getRepository(Voluntery);

    // Your code that uses userRepository and volunteryRepository
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
