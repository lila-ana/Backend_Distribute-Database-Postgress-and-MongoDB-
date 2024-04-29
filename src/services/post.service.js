const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
const configs = require('../config/config');
const { getConnection } = require('typeorm');

// const dataSource = require('../utils/createDatabaseConnection');
const { Post } = require('../models');

// const postRepository = dataSource.getRepository(Post).extend({
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

const createPost = async ({ name, description, image }) => {
  // Create a new post object with the provided details

  const connection = getConnection();
  const postRepository = connection.getRepository(Post);
  const post = await postRepository.create({ name, description, image });

  // Save the post to the database
  return postRepository.save(post);
};

const getAllPost = async () => {
  const connection = getConnection();
  const postRepository = connection.getRepository(Post);
  return postRepository.find();
};
/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */

const getPostById = async (id) => {
  const post = await postRepository.findOneBy({ id });
  return post;
};
// Service code
const updatePostById = async (postId, updateBody) => {
  try {
    // Fetch post from the database
    const post = await getPostById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    // If post is a Mongoose document, convert it to a plain JavaScript object
    const postObject = post.toObject ? post.toObject() : post;

    // Merge updateBody with existing post properties
    const updatedPost = { ...postObject, ...updateBody };

    // Update the post in the database
    const updatedPostDocument = await postRepository.update({ id: postId }, updatedPost);
    let updateResult;
    if (updatedPostDocument) {
      updateResult = await getPostById(postId);
    } else {
      return 'note update';
    }
    console.log(updateResult, 'updatedPostDocument');
    return { updateResult };
  } catch (error) {
    throw new Error(error.message); // Rethrow the error
  }
};

const deletePost = async (id) => {
  const post = await getPostById(id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
  }
  const Post = await postRepository.delete({ id: id });
  return Post;
};

module.exports = {
  createPost,
  getAllPost,
  updatePostById,
  deletePost,
  getPostById,
};
