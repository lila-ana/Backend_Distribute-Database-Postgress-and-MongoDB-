const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedBackService, userService } = require('../services');

const createFeedback = catchAsync(async (req, res) => {
  try {
    const { name, email, message, is_seen } = req.body;

    const user = await feedBackService.createfeedback({ name, email, message, is_seen });

    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    // Handle any errors that occur during authentication
    res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
  }
});
const getAllFeedback = catchAsync(async (req, res) => {
  const Feedbacks = await feedBackService.getAllFeedBack();
  res.send(Feedbacks);
});
const getFeedback = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const updateFeedback = catchAsync(async (req, res) => {
  const { is_seen } = req.body;
  const post = await feedBackService.updateFeedbackById(req.params.userId, { is_seen }); // Pass is_seen directly
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FeedBack not found');
  }
  res.send(post);
});
const getAllUsers = catchAsync(async (req, res) => {
  const getAllUsers = await feedBackService.getAllUsers();
  res.send(getAllUsers);
});

const updateUser = catchAsync(async (req, res) => {
  const post = await userService.updateUserById(req.params.postId, req.body);
  res.send(post);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFeedback,
  getFeedback,
  updateFeedback,
  updateUser,
  deleteUser,
  getAllFeedback,
  getAllUsers,
};
