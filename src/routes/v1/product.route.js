const express = require('express');
const validate = require('../../middlewares/validate');
// const { productValidation } = require('../../validations');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router
  .route('/products')
  .get(validate(productValidation.getProducts), productController.getProducts)
  .post(validate(productValidation.createProduct), productController.createProduct);

router.route('/products/:productId').get(validate(productValidation.getProductById));

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Sản phẩm
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm (search, sort, filter, pagination)
 *     tags: [Products]
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *       - name: filter
 *         in: query
 *         schema:
 *           type: object
 *           properties:
 *             fieldName:
 *               type: object
 *               properties:
 *                 operator:
 *                   type: string
 *       - name: sort
 *         in: query
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: order
 *         in: query
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data: []
 *                 pagination: {
 *                   totalCount: 1,
 *                   totalPages: 1,
 *                   currentPage: 1,
 *                   limit: 1,
 *                 }
 *                 success: true
 */

module.exports = router;
