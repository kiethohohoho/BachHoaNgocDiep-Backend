const express = require('express');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/products')
  .get(auth('getProducts'), validate(productValidation.getProducts), productController.getProducts)
  .post(
    auth('manageProducts'),
    validate(productValidation.createProduct),
    productController.createProduct
  );

router
  .route('/products/:productId')
  .get(
    auth('getProducts'),
    validate(productValidation.getOrDeleteProductById),
    productController.getProductById
  )
  .patch(
    auth('manageProducts'),
    validate(productValidation.updateProductById),
    productController.updateProductById
  )
  .delete(
    auth('manageProducts'),
    validate(productValidation.getOrDeleteProductById),
    productController.deleteProductById
  );

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
 *     description: Cho phép search, sort, multi filter, phân trang /products?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
 *                 Data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 Pagination:
 *                   type: object
 *                   properties:
 *                     TotalCount:
 *                       type: integer
 *                       example: 1
 *                     TotalPages:
 *                       type: integer
 *                       example: 1
 *                     CurrentPage:
 *                       type: integer
 *                       example: 1
 *                     Limit:
 *                       type: integer
 *                       example: 10
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   post:
 *     summary: Tạo mới một sản phẩm
 *     description: Tạo trước Nhóm danh mục, Danh mục và Thương hiệu sản phẩm (nếu cần), upload ảnh cho sản phẩm
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandid
 *               - name
 *               - price
 *               - quantity
 *             properties:
 *               brandid:
 *                 type: string
 *               categoryid:
 *                 type: string
 *               categorygroupid:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *                 min: 0
 *               quantity:
 *                 type: number
 *                 format: integer
 *                 min: 0
 *             example:
 *               brandid: "1"
 *               categoryid: "1"
 *               categorygroupid: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               price: 80.9
 *               quantity: 36
 *     responses:
 *       "201":
 *         description: Tạo sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Lấy thông tin một sản phẩm
 *     description: Bao gồm cả thông tin Nhóm danh mục, Danh mục và Thương hiệu sản phẩm (nếu có)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một sản phẩm
 *     description: Cập nhật thông tin của một sản phẩm
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandid:
 *                 type: string
 *               categoryid:
 *                 type: string
 *               categorygroupid:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *                 min: 0
 *               rate:
 *                 type: number
 *                 format: decimal
 *                 min: 0
 *                 max: 5
 *               quantity:
 *                 type: number
 *                 format: integer
 *                 min: 0
 *             example:
 *               brandid: "1"
 *               categoryid: "1"
 *               categorygroupid: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               description: Sữa ngon vạn người mê
 *               price: 80.9
 *               rate: 4.5
 *               quantity: 36
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Xoá một sản phẩm
 *     description: Thao tác này chỉ "xoá mềm" một sản phẩm, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product Id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
module.exports = router;
