const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userProfileService } = require('../services');

const createUserProfile = catchAsync(async (req, res) => {
  const user = await userProfileService.createUserProfile(req.body);
  // console.log('firstttttt', req.body);

  res.status(httpStatus.CREATED).send(user);
});

const getUsersProfile = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userProfileService.queryUsersProfile(filter, options);
  res.send(result);
});

const getUserProfile = catchAsync(async (req, res) => {
  const post = await userProfileService.getUserProfileById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updateUserProfile = catchAsync(async (req, res) => {
  const post = await userProfileService.updateUserProfileById(req.params.postId, req.body);
  res.send(post);
});

const deleteUserProfile = catchAsync(async (req, res) => {
  await userProfileService.deleteUserProfileById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUserProfile,
  getUsersProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
