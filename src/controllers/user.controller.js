const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { emailService } = require('../services');

const createUser = async (userData) => {
  try {
    const { newUserMongo, newUserPostgress } = await userService.createUser(userData);

    return { mongoUser: newUserMongo, PostgressUser: newUserPostgress };
  } catch (error) {
    console.error('Error creating user in both MongoDB: ', error);
    throw error;
  }
};

module.exports = {
  createUser,
};

const createUserPostgress = async (userData) => {
  try {
    const newUserPostgres = await userService.createUserPostgres(userData);
    // const newUserPostgres = await userService.createUserPostgres(userData);
    return { postgress_User: newUserPostgres };
  } catch (error) {
    console.error('Error creating user in both MongoDB: ', error);
    throw error;
  }
};
// const getAllUserss = catchAsync(async (req, res) => {
//   const users = await userService.getAllUsers();
//   res.send(users);
// });

// const getAllUsers = catchAsync(async (req, res) => {
//   const users = await userService.getAllUsers(); // Call getAllUsers without any parameters
//   if (!users) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
//   }
//   res.send(users);
// });
const getAllUsers = catchAsync(async (req, res) => {
  const getAllUsers = await userService.getAllUsers();
  res.send(getAllUsers);
});
module.exports = {
  createUser,
  createUserPostgress,
  // getUser,
  getAllUsers,
};
