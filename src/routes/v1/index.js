const express = require('express');
const userRoute = require('./user.route');
const userProfileRoute = require('./userProfile.route');
const userAdminRoute = require('./userAdmin.route');
const paymentRoute = require('./payment.route');
const emailRoute = require('./mailchimp.route');
const eventRoute = require('./event.route');
const feedBackRoute = require('./feedBack.route');
const postRoute = require('./post.route');
const volunteryRoute = require('./volunteryType.route');

// const docsRoute = require('./docs.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/userProfile',
    route: userProfileRoute,
  },
  {
    path: '/userAdmin',
    route: userAdminRoute,
  },
  {
    path: '/volunteryType',
    route: volunteryRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/emails',
    route: emailRoute,
  },
  {
    path: '/event',
    route: eventRoute,
  },
  {
    path: '/post',
    route: postRoute,
  },
  {
    path: '/feedBack',
    route: feedBackRoute,
  },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
