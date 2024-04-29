const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userAdminService } = require('../services');

const createUserAdmin = async (req, res) => {
  try {
    const path = req.file ? req.file.path : null;
    req.body.path = path;
    const user = await userAdminService.createUser(req.body); // Create a new user
    res.status(httpStatus.CREATED).send(user); // Send the user details in the response
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
};

const getUsersAdmin = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userAdminService.queryUsers(filter, options);
  res.send(result);
});

const getUserAdmin = catchAsync(async (req, res) => {
  const post = await userAdminService.getUserById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updateUserAdmin = catchAsync(async (req, res) => {
  const post = await userAdminService.updateUserById(req.params.postId, req.body);
  res.send(post);
});

const deleteUserAdmin = catchAsync(async (req, res) => {
  await userAdminService.deleteUserById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUserAdmin,
  getUsersAdmin,
  getUserAdmin,
  updateUserAdmin,
  deleteUserAdmin,
};
