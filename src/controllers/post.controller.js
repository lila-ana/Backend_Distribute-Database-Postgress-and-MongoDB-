const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  try {
    // Get the uploaded image file
    const image = req.file ? req.file.filename : null;

    // Extract other fields from request body
    const { name, description } = req.body;

    // Create the post with image details
    const post = await postService.createPost({ name, description, image });

    // Construct the URL for the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${image}`;

    // Respond with success and image URL
    res.status(httpStatus.CREATED).json({
      status: 'Success',
      post: {
        id: post.id,
        name: post.name,
        description: post.description,
        imageUrl: imageUrl,
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    // Handle errors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// const getAllPost = catchAsync(async (req, res) => {
//   const posts = await postService.getAllPost();
//   res.send(posts);
// });
const deletePosts = catchAsync(async (req, res) => {
  try {
    const deletedPost = await postService.deletePost(req.params.postId);
    res.send(deletedPost);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});
const getAllPosts = catchAsync(async (req, res) => {
  try {
    // Fetch all posts from the database using the postService
    const posts = await postService.getAllPost();

    // Map each post to include the image URL
    const postsWithImageUrl = posts.map((post) => {
      const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${post.image}`;
      return {
        id: post.id,
        createdAt: post.createdAt,
        name: post.name,
        description: post.description,
        image: post.image,
        imageUrl: imageUrl,
      };
    });

    // Respond with the posts including image URLs
    res.status(httpStatus.OK).json({
      status: 'Success',
      posts: postsWithImageUrl,
    });
  } catch (error) {
    // Handle errors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const getPost = await postService.getPostById(req.params.postId);
    const { name, description } = req.body;
    const imagePath = req.file ? req.file.filename : getPost.image;
    const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${imagePath}`;
    const update = await postService.updatePostById(postId, { name, description, image: imagePath });
    const post = await postService.getPostById(req.params.postId);

    res.status(200).json({
      status: 'Success',
      update: {
        id: post.id,
        name: post.name,
        createdAt: post.createdAt,
        description: post.description,
        imageUrl: imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePosts,
};
