const express = require('express');
const validate = require('../../middlewares/validate');
const { paymentValidation } = require('../../validations');
const { paymentController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth('user'), validate(paymentValidation.getPayments), paymentController.getPayments)
  .post(auth('user'), validate(paymentValidation.createPayment), paymentController.createPayment);

router
  .route('/:paymentId')
  .get(
    auth('user'),
    validate(paymentValidation.getOrDeletePaymentById),
    paymentController.getPaymentById
  )
  .patch(
    auth('admin'),
    validate(paymentValidation.updatePaymentById),
    paymentController.updatePaymentById
  )
  .delete(
    auth('admin'),
    validate(paymentValidation.getOrDeletePaymentById),
    paymentController.deletePaymentById
  );

router
  .route('/profile')
  .get(
    auth('user'),
    validate(paymentValidation.getPaymentByProfile),
    paymentController.getPaymentByProfile
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Lấy danh sách payment (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /payments?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Payments]
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
 *                     $ref: '#/components/schemas/Payment'
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
 *     summary: Tạo mới một payment
 *     description: Tạo trước Nhóm payment và Payment sản phẩm (nếu cần)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardnumber
 *               - ownername
 *               - bankname
 *             properties:
 *               cardnumber:
 *                 type: string
 *               ownername:
 *                 type: string
 *               bankname:
 *                 type: string
 *             example:
 *               cardnumber: "58110001321860"
 *               ownername: "LE TAN KIET"
 *               bankname: "BIDV"
 *     responses:
 *       "201":
 *         description: Tạo payment thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
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
 * /payments/{paymentId}:
 *   get:
 *     summary: Lấy thông tin một payment theo Id
 *     description: Lấy thông tin một payment theo Id
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: payment Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một payment
 *     description: Cập nhật thông tin của một payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardnumber:
 *                 type: string
 *               ownername:
 *                 type: string
 *               bankname:
 *                 type: string
 *             example:
 *               cardnumber: "58110001321860"
 *               ownername: "LE TAN KIET"
 *               bankname: "BIDV"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
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
 *     summary: Xoá một payment
 *     description: Thao tác này chỉ "xoá mềm" một payment, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Id
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
 * /payments/profile:
 *   get:
 *     summary: Lấy danh sách payment theo profile
 *     description: Lấy danh sách payment theo profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: account Id
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
 *                     $ref: '#/components/schemas/Payment'
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
