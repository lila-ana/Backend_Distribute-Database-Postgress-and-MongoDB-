const httpStatus = require('http-status');
const { userAdmin } = require('../models');
// const dataSource = require('../utils/createDatabaseConnection');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');

// const userRepository = dataSource.getRepository(userAdmin).extend({
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
const createUser = async (userData) => {
  try {
    const user = userRepository.create(userData); // Create a new user document
    return userRepository.save(user); // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
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

const queryUsers = async (filter, options) => {
  const { limit, page } = options;

  return userRepository.findAll({
    tableName: 'user',
    sortOptions: sortBy && { option: sortBy },
    paginationOptions: { limit, page },
  });
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getUserById = async (id) => {
  return userRepository.findOneBy({ id });
};

/**
 * Update user by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updateUserById = async (postId, updateBody) => {
  const post = await getUserById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const update = await userRepository.update({ id: postId }, updateBody);
  return update;
};

/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */
const deleteUserById = async (postId) => {
  const post = await getUserById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return userRepository.delete({ id: postId });
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
