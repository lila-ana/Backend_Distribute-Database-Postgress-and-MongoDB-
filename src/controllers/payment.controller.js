const paymentService = require('../services/payment.service');
const catchAsync = require('../utils/catchAsync');

const processPayment = catchAsync(async (req, res) => {
  try {
    const paymentIntent = await paymentService.processStripePayment(req.body);
    res.status(200).json({ success: true, clientSecret: paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const getBalance = catchAsync(async (req, res) => {
  try {
    const Balances = await paymentService.getBalance();
    res.status(200).json({ success: true, allBalance: Balances });
  } catch (error) {
    res.status(500).json({ Success: false, error: error.message });
  }
});

const processSubscriptions = catchAsync(async (req, res) => {
  try {
    const result = await paymentService.processStripeSubscription(req.body);
    res.status(200).json({ Success: true, clientSecret: result });
  } catch (error) {
    res.status(500).json({ Success: false, error: error.message });
  }
});

const registerDonation = catchAsync(async (req, res) => {
  try {
    const result = await paymentService.registerDonation(req.body);
    res.status(200).json({ Success: true, result });
  } catch (error) {
    res.status(500).json({ Success: false, error: error.message });
  }
});
const webhook = catchAsync(async (req, res) => {
  try {
    const result = await paymentService.webhook(req);
    res.status(200).json({ Success: true, writeOpperation: result });
  } catch (error) {
    res.status(500).json({ Success: false, error: error.message });
  }
});
module.exports = {
  processPayment,
  getBalance,
  processSubscriptions,
  webhook,
  registerDonation,
};
