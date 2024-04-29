const mailchimp = require('@mailchimp/mailchimp_marketing');

async function sendMailChimp(to, subject, message) {
  // Implement your logic to send emails using Mailchimp API
  const listId = 'your_mailchimp_list_id_here'; // Replace with your Mailchimp list ID
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: to,
    status: 'subscribed',
    merge_fields: {
      FNAME: 'Subscriber', // You can customize merge fields as per your requirement
      LNAME: '',
    },
  });
  // const response = await mailchimp.messages.send({
  //     to: [{ email: to }],
  //     subject: subject,
  //     html: message
  // });
}
