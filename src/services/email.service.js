/* eslint-disable no-empty */
const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, API_KEY } = process.env;
const mailchimpTransactional = require('@mailchimp/mailchimp_transactional');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const axios = require('axios');
const configs = require('../config/config');
// const client = mailchimpTransactional.createTransactionalClient(API_KEY);

// const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
// if (config.env !== 'test') {
//   transport
//     .verify()
//     .then(() => logger.info('Connected to email server'))
//     .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
// }

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  // await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};
const event = {
  name: ' JS Developers Meetup ',
};
const footerContactInfo = {
  company: ' Mailchimp ',
  address1: ' 405 N Angier Ave NE ',
  city: ' Atlanta ',
  state: ' GA ',
  zip: ' 30308 ',
  country: ' US ',
};
const campaignDefaults = {
  from_name: ' Getting Together ',
  from_email: ' efisolm22@gmail.com',
  subject: ' JS Developers Meetup ',
  language: ' EN_US ',
};
async function sendMailChimp(to, subject, message) {
  // Implement your logic to send emails using Mailchimp API
  try {
    mailchimp.setConfig({
      apiKey: configs.MAILCHIMP_API_KEY,
      server: configs.MAILCHIMP_SERVER_PREFIX,
    });
    const mailSent = await mailchimp.messages.sendTemplate({
      template_name: 'Your_Template_Name',
      template_content: [],
      message: {
        to: [{ email: to }],
        subject,
        html: message,
      },
    });
    console.log(mailSent, 'Yooo');
  } catch (error) {
    console.log(error, 'Epha');
  }
}
const send = async (email) => {
  try {
    const templateName = 'your-template-name'; // Replace with the name of your Mandrill template
    const templateContent = []; // If your template has dynamic content, provide it here
    const message = {
      subject: 'Welcome to Our Service!',
      from_email: 'your@email.com', // Replace with your email address
      to: [{ email }],
      merge: true, // Enable merge tags if you have dynamic content in your template
      merge_language: 'handlebars', // Use handlebars for merge tags
    };
    const result = await mailchimpTransactional.messages.sendTemplate({
      template_name: templateName,
      template_content: templateContent,
      message,
    });
    console.log('Welcome email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};
mailchimp.setConfig({
  apiKey: '70a230e765f219d94fe6224399dbafcb-us22',
  server: 'us22',
});

async function sendMailChimp (to, subject, message) {
  // Implement your logic to send emails using Mailchimp API
  try {
    const listId = 'your_mailchimp_list_id_here'; // Replace with your Mailchimp list ID
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: to,
      status: 'subscribed',
      merge_fields: {
        FNAME: 'Subscriber', // You can customize merge fields as per your requirement
        LNAME: '',
      },
    });
    const mailSent = await mailchimp.messages.send({
      to: [{ email: to }],
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  // transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendMailChimp,
};
