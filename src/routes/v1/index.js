const express = require('express');
const authRoute = require('./auth.route');
const productRoute = require('./product.route');
const brandRoute = require('./brand.route');
const categoryRoute = require('./category.route');
const categoryGroupRoute = require('./categoryGroup.route');
const docsRoute = require('./docs.route');
const imageRoute = require('./image.route');
const userRoute = require('./user.route');
const cartRoute = require('./cart.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/',
    route: productRoute,
  },
  {
    path: '/',
    route: brandRoute,
  },
  {
    path: '/',
    route: categoryRoute,
  },
  {
    path: '/',
    route: categoryGroupRoute,
  },
  {
    path: '/',
    route: imageRoute,
  },
  {
    path: '/',
    route: userRoute,
  },
  {
    path: '/',
    route: cartRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
