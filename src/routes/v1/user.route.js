const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const validate = require('../../middlewares/validate');
const router = express.Router();
const { feedBackController } = require('../../controllers');
const { userController } = require('../../controllers');
const { eventController } = require('../../controllers');
const { postController } = require('../../controllers');
const { volunteryTypeController } = require('../../controllers');

const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const publicDirectoryPath = path.join(__dirname, 'public');

const uploade = multer({ storage });
app.use('/public', express.static(publicDirectoryPath));
router.post('/users', async (req, res) => {
  try {
    const user = await userController.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.route('/users').get(feedBackController.getAllUsers);

router.route('/feedBack').post(feedBackController.createFeedback).get(feedBackController.getAllFeedback);

router.post('/postgress/users', async (req, res) => {
  try {
    const user = await userController.createUserPostgress(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.route('/event').post(uploade.single('image'), eventController.createEvent).get(eventController.getEvents);
module.exports = router;

router.route('/post').post(uploade.single('image'), postController.createPost).get(postController.getAllPosts);

router.route('/').post(uploade.single('image'), postController.createPost).get(postController.getAllPosts);

router.route('/volunteryType').post(volunteryTypeController.createVoluntery).get(volunteryTypeController.getAllVolunterys);

const paymentController = require('../../controllers/payment.controller');

router.route('/process').post(paymentController.processPayment);
