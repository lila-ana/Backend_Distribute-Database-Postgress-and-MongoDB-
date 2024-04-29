const express = require('express');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.route('/process').post(paymentController.processPayment);
router.route('/balance').get(paymentController.getBalance);
router.route('/subscriptions').post(paymentController.processSubscriptions);
router.route('/webhook').post(paymentController.registerDonation);

module.exports = router;
