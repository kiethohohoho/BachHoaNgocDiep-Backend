const express = require('express');
const validate = require('../../middlewares/validate');
const { cartValidation } = require('../../validations');
const { cartController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/carts')
  .get(auth('getCarts'), cartController.getCarts)
  .post(auth('manageCarts'), validate(cartValidation.createCart), cartController.createCart);

router
  .route('/carts/:cartId')
  .get(auth('getCarts'), validate(cartValidation.getOrDeleteCartById), cartController.getCartById)
  .patch(
    auth('manageCarts'),
    validate(cartValidation.updateCartById),
    cartController.updateCartById
  )
  .delete(
    auth('manageCarts'),
    validate(cartValidation.getOrDeleteCartById),
    cartController.deleteCartById
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Giỏ hàng
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Lấy danh sách sản phẩm trong giỏ hàng (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /carts?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Carts]
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
 *                     $ref: '#/components/schemas/Cart'
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
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   post:
 *     summary: Thêm vào giỏ hàng
 *     description: Thêm vào giỏ hàng
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productid
 *               - quantity
 *             properties:
 *               productid:
 *                 type: string
 *               quantity:
 *                 type: number
 *             example:
 *               productid: "1"
 *               quantity: 5
 *     responses:
 *       "201":
 *         description: Thêm vào giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Cart'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /carts/{cartId}:
 *   get:
 *     summary: Lấy thông tin một giỏ hàng
 *     description: Bao gồm cả thông tin Nhóm danh mục và Danh mục sản phẩm (nếu có)
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Cart'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một giỏ hàng
 *     description: Cập nhật thông tin của một giỏ hàng
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryid:
 *                 type: string
 *               categorygroupid:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               categoryid: "1"
 *               categorygroupid: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               description: Sữa tiệt trùng ColosBaby
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Cart'
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
 *     summary: Xoá một giỏ hàng
 *     description: Thao tác này chỉ "xoá mềm" một giỏ hàng, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart Id
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

/**
 * @swagger
 * /carts/category/:categoryId:
 *   get:
 *     summary: Lấy danh sách giỏ hàng theo categoryId
 *     description: Lấy danh sách giỏ hàng theo categoryId
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: category Id
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
 *                     $ref: '#/components/schemas/Cart'
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
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
