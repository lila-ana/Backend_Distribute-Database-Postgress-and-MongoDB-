const httpStatus = require('http-status');
const { emailService } = require('../services');

const sendNewsletter = async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const mail = await emailService.sendMailChimp(to, subject, message);
    res.status(httpStatus.OK).json({ success: true, message: `'Email sent successfully'${mail}` });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Failed to send email', error: error.message });
  }
};

module.exports = {
  sendNewsletter,
};
