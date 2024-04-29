const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const validate = require('../../middlewares/validate');
const { eventValidation } = require('../../validations');
const { eventController } = require('../../controllers');

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const publicDirectoryPath = path.join(__dirname, 'public');

const uploade = multer({ storage });
app.use('/public', express.static(publicDirectoryPath));

router
  .route('/')
  .post(uploade.single('image'), eventController.createEvent)
  .get(validate(eventValidation.getEvents), eventController.getEvents);

router
  .route('/:eventId')
  .get(validate(eventValidation.getEvent), eventController.getEvent)
  .patch(validate(eventValidation.updateEvent), uploade.single('image'), eventController.updateEvent)
  .delete(validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;
