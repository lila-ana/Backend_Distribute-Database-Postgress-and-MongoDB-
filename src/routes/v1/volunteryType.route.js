const express = require('express');
const validate = require('../../middlewares/validate');
const { volunteryValidation } = require('../../validations');
const { volunteryTypeController } = require('../../controllers');
// const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(validate(volunteryValidation.createVoluntery), volunteryTypeController.createVoluntery)
  .get(validate(volunteryValidation.getVolunterys), volunteryTypeController.getAllVolunterys);

router
  .route('/:volunteryId')
  .get(validate(volunteryValidation.getVoluntery), volunteryTypeController.getVoluntery)
  .patch(validate(volunteryValidation.updateVoluntery), volunteryTypeController.updateVoluntery)
  .delete(volunteryTypeController.deleteVoluntery);
module.exports = router;
