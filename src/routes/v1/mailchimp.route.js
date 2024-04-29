const express = require('express');
const { emailController } = require('../../controllers');

const router = express.Router();

router.route('/send-newsletter').post(emailController.sendNewsletter);
// router.route('/reset-password').post(emailController.resetPassword);

module.exports = router;
