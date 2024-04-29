const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
// const dataSource = require('../utils/createDatabaseConnection');
const { FeedBack } = require('../models');
const UserPostgres = require('../models/user.model');
const UserMongo = require('../models/userMongoDB.model');
const { getConnection } = require('typeorm');
const { userService } = require('../services');

// const feedBackRepository = dataSource.getRepository(FeedBack).extend({
//   findAll,
//   sortBy,
// });
// .extend({ sortBy });
//

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Post>}
 */

const createfeedback = async (ReqBody) => {
  const connection = getConnection();
  const userRepository = connection.getRepository(FeedBack);
  const savedUserPostgress = await userRepository.save(ReqBody);
  return savedUserPostgress;
};

const getAllFeedBack = async () => {
  const connection = getConnection();
  const feedBackRepository = connection.getRepository(FeedBack);
  return feedBackRepository.find();
};
/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */
const getAllUsers = async (req, res) => {
  const connection = getConnection();
  const feedBackRepository = connection.getRepository(UserPostgres);
  return await feedBackRepository.find({ where: { role: 'superAdmin' } });
  // res.send(getAllUsers);
};

const getFeedbackById = async (id) => {
  return feedBackRepository.findOne({ where: { id } });
};
const updateFeedbackById = async (feedbackId, updateBody) => {
  const feedback = await getFeedbackById(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  const updateResult = await feedBackRepository.update({ id: feedbackId }, updateBody);
  let updatedFeedback;
  if (updateResult) {
    updatedFeedback = await getFeedbackById(feedbackId);
  } else {
    return 'none updated';
  }
  return { updatedFeedback };
};

module.exports = {
  createfeedback,
  getAllFeedBack,
  updateFeedbackById,
  getAllUsers,
};
