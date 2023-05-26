const express = require('express');
const validate = require('../../middlewares/validate');
const { analystValidation } = require('../../validations');
const { analystController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get(
  '/revenue',
  auth('admin'),
  validate(analystValidation.getRevenue),
  analystController.getRevenue
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Analyst
 *   description: Thống kê
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Lấy danh sách sản phẩm trong giỏ hàng (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /carts?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Analyst]
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
 */
