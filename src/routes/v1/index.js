const express = require('express');
const authRoute = require('./auth.route');
const productRoute = require('./product.route');
const brandRoute = require('./brand.route');
const categoryRoute = require('./category.route');
const categoryGroupRoute = require('./categoryGroup.route');
const docsRoute = require('./docs.route');
const imageRoute = require('./image.route');
const bannerRoute = require('./banner.route');
const userRoute = require('./user.route');
const cartRoute = require('./cart.route');
const addressRoute = require('./address.route');
const paymentRoute = require('./payment.route');
const reviewRoute = require('./review.route');
const orderRoute = require('./order.route');
const analystRoute = require('./analyst.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/brands',
    route: brandRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/categoryGroups',
    route: categoryGroupRoute,
  },
  {
    path: '/images',
    route: imageRoute,
  },
  {
    path: '/banners',
    route: bannerRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/carts',
    route: cartRoute,
  },
  {
    path: '/addresses',
    route: addressRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/analyst',
    route: analystRoute,
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
