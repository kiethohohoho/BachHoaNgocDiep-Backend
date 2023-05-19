const express = require('express');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth('user'), validate(orderValidation.getOrders), orderController.getOrders)
  .post(auth('user'), validate(orderValidation.createOrder), orderController.createOrder);

router
  .route('/:orderId')
  .get(auth('user'), validate(orderValidation.getOrDeleteOrderById), orderController.getOrderById)
  .patch(auth('admin'), validate(orderValidation.updateOrderById), orderController.updateOrderById)
  .delete(
    auth('admin'),
    validate(orderValidation.getOrDeleteOrderById),
    orderController.deleteOrderById
  );

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Đơn hàng
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lấy danh sách Đơn hàng (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /orders?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Orders]
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
 *                     $ref: '#/components/schemas/Order'
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
 *     summary: Tạo đơn hàng
 *     description: Tạo trước Đơn hàng, paidtype true là chuyển khoản, false là tiền mặt
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - shippingcost
 *               - address
 *             properties:
 *               data:
 *                 type: array
 *               totalprice:
 *                 type: number
 *               shippingcost:
 *                 type: number
 *               address:
 *                 type: object
 *               paidtype:
 *                 type: string
 *               notes:
 *                 type: string
 *             example:
 *               data: []
 *               totalprice: 0
 *               shippingcost: 0
 *               address: {
 *                 City: "",
 *                 District: "",
 *                 Ward: "",
 *                 Street: "",
 *                 ReceiverName: "",
 *                 ReceiverPhoneNumber: ""
 *               }
 *               paidtype: "paidtype"
 *               notes: "notes"
 *     responses:
 *       "201":
 *         description: Tạo Đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Order'
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
 * /orders/{orderId}:
 *   get:
 *     summary: Lấy thông tin một Đơn hàng
 *     description: Bao gồm cả thông tin Đơn hàng và Danh mục sản phẩm (nếu có)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Order'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật trạng thái đơn hàng
 *     description: Đang chờ duyệt (1) - Đã duyệt (2) - Đang giao hàng (3) - Hoàn thành (4) - Hủy (5)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statuscode:
 *                 type: number
 *             example:
 *               statuscode: 2
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Order'
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
 *     summary: Xoá một Đơn hàng
 *     description: Thao tác này chỉ "xoá mềm" một Đơn hàng, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Id
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
 *                     $ref: '#/components/schemas/Order'
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
module.exports = router;
