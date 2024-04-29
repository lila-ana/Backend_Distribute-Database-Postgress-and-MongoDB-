const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const validate = require('../../middlewares/validate');
const { Validation } = require('../../validations');
const { postController } = require('../../controllers');
// const authMiddleware = require('../../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const publicDirectoryPath = path.join(__dirname, 'public');

const uploade = multer({ storage });
app.use('/public', express.static(publicDirectoryPath));

const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createPost), uploade.single('image'), postController.createPost)
  .get(validate(Validation.getPosts), postController.getAllPosts);
router.route('/:postId').delete(postController.deletePosts);
router.route('/:postId').patch(uploade.single('image'), postController.updatePost);

module.exports = router;
