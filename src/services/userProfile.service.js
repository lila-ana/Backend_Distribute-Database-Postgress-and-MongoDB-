const httpStatus = require('http-status');
const { UserProfile } = require('../models');
// const dataSource = require('../utils/createDatabaseConnection');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');

// const userProfileRepository = dataSource.getRepository(UserProfile).extend({
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
const createUserProfile = async (postBody) => {
  const doc = userProfileRepository.create(postBody);
  return await userProfileRepository.save(doc);
};

/**
 * Query for users
 * @param {Object} filter - Filter options
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryUsersProfile = async (filter, options) => {
  const { limit, page, sortBy } = options;

  return await userProfileRepository.findAll({
    tableName: 'userProfile',
    sortOptions: sortBy && { option: sortBy },
    paginationOptions: { limit: limit, page: page },
  });
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getUserProfileById = async (id) => {
  return await userProfileRepository.findOneBy({ id: id });
};

/**
 * Update user by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updateUserProfileById = async (postId, updateBody) => {
  const post = await getUserById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await userProfileRepository.update({ id: postId }, updateBody);
  return await getUserById(postId);
};

/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */
const deleteUserProfileById = async (postId) => {
  const post = await getUserById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return await userProfileRepository.delete({ id: postId });
};

module.exports = {
  createUserProfile,
  queryUsersProfile,
  getUserProfileById,
  updateUserProfileById,
  deleteUserProfileById,
};
