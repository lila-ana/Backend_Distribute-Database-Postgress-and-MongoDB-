const { getConnection } = require('typeorm');
const UserPostgres = require('../models/user.model');
const UserMongo = require('../models/userMongoDB.model');

// Function to create a user in both MongoDB and PostgreSQL
// MongoDB Model

// Function to create a user in MongoDB
// MongoDB Model

// Function to create a user in MongoDB
// Import Mongoose model
// const UserMongo = require('../models/userMongo');

const createUser = async (userData) => {
  try {
    // Create a new user instance based on the provided data
    const newUserMongo = new UserMongo(userData);
    const connection = getConnection();
    const userRepository = connection.getRepository(UserPostgres);
    const savedUserPostgress = await userRepository.save(userData);
    // Save the new user to MongoDB
    const savedUserMongo = await newUserMongo.save();

    console.log('newUserMongo:', savedUserMongo, 'savedUserPostgress:', savedUserPostgress);

    return { newUserMongo: savedUserMongo, newUserPostgress: savedUserPostgress };
  } catch (error) {
    console.error('Error creating user in MongoDB: ', error);
    throw error;
  }
};

const createUserPostgres = async (userData) => {
  try {
    const connection = getConnection();
    const userRepository = connection.getRepository(UserPostgres);
    const newUser = await userRepository.save(userData);
    return newUser;
  } catch (error) {
    console.error('Error creating user in PostgreSQL: ', error);
    throw error;
  }
};
// Import necessary modules and models
// const getAllUsers = async (body) => {
//   try {
//     console.log(true);
//     const connection = getConnection();
//     const userRepository = connection.getRepository(UserPostgres);
//     const users = await userRepository.find(); // Use find() to retrieve all users
//     return users;
//   } catch (error) {
//     console.error('Error getting user data from PostgreSQL: ', error);
//     throw error;
//   }
// };

const getAllUsers = async () => {
  try {
    const connection = getConnection(); // Assuming getConnection() returns the connection instance
    const userRepository = connection.getRepository(UserPostgres); // Assuming UserPostgres is your entity model for users

    // Fetch users with the role of "superAdmin"
    const users = await userRepository.find({ where: { role: 'superAdmin' } });

    return users;
  } catch (error) {
    console.error('Error fetching users from PostgreSQL:', error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
};

// Add more service functions as needed

module.exports = {
  createUser,
  createUserPostgres,
};
