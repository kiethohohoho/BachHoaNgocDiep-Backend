const express = require('express');
const validate = require('../../middlewares/validate');
const { orderDetailValidation } = require('../../validations');
const { orderDetailController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(orderDetailValidation.getOrderDetails), orderDetailController.getOrderDetails)
  .post(
    auth('admin'),
    validate(orderDetailValidation.createOrderDetail),
    orderDetailController.createOrderDetail
  );

router
  .route('/:orderDetailId')
  .get(
    auth('user'),
    validate(orderDetailValidation.getOrDeleteOrderDetailById),
    orderDetailController.getOrderDetailById
  )
  .patch(
    auth('admin'),
    validate(orderDetailValidation.updateOrderDetailById),
    orderDetailController.updateOrderDetailById
  )
  .delete(
    auth('admin'),
    validate(orderDetailValidation.getOrDeleteOrderDetailById),
    orderDetailController.deleteOrderDetailById
  );

router
  .route('/order/:orderId')
  .get(
    validate(orderDetailValidation.getOrderDetailByOrderId),
    orderDetailController.getOrderDetailByOrderId
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: Danh mục
 */

/**
 * @swagger
 * /orderDetails:
 *   get:
 *     summary: Lấy danh sách danh mục (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /orderDetails?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [OrderDetails]
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
 *                     $ref: '#/components/schemas/OrderDetail'
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
 *     summary: Tạo mới một danh mục
 *     description: Tạo trước Nhóm danh mục và Danh mục sản phẩm (nếu cần)
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               orderId:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               orderId: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               description: Sữa tiệt trùng ColosBaby
 *     responses:
 *       "201":
 *         description: Tạo danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
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
 * /orderDetails/{orderId}:
 *   get:
 *     summary: Lấy thông tin một danh mục theo Id
 *     description: Lấy thông tin một danh mục theo Id
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: orderDetail Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một danh mục
 *     description: Cập nhật thông tin của một danh mục
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: OrderDetail Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               orderId: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               description: Sữa tiệt trùng ColosBaby
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
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
 *     summary: Xoá một danh mục
 *     description: Thao tác này chỉ "xoá mềm" một danh mục, vẫn có thể khôi phục sau khi xoá.
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: OrderDetail Id
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
 * /orderDetails/order/:orderId:
 *   get:
 *     summary: Lấy danh sách danh mục theo orderId
 *     description: Lấy danh sách danh mục theo orderId
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: orderDetail Id
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
 *                     $ref: '#/components/schemas/OrderDetail'
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
