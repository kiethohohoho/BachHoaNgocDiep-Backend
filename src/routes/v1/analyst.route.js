const express = require('express');
// const validate = require('../../middlewares/validate');
// const { analystValidation } = require('../../validations');
const { analystController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/revenue', auth('admin'), analystController.getRevenue);

router.get('/saleproducttoday', auth('admin'), analystController.getSaleProductToday);

router.get('/amountByPaidType', auth('admin'), analystController.getAmountByPaidType);

router.get(
  '/threebestsellingproducts',
  auth('admin'),
  analystController.getThreeBestSellingProducts
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
 * /analyst/revenue:
 *   get:
 *     summary: Lấy thống kê tổng tiền các đơn hàng trong ngày, tuần, tháng hiện tại
 *     description: Lấy thống kê tổng tiền các đơn hàng trong ngày, tuần, tháng hiện tại
 *     tags: [Analyst]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /analyst/saleproducttoday:
 *   get:
 *     summary: Số lượng sản phẩm bán được trong hôm nay
 *     description: So sánh với ngày hôm trước
 *     tags: [Analyst]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /analyst/amountByPaidType:
 *   get:
 *     summary: Số lượng đơn hàng bán được trong hôm nay
 *     description: Phân loại cash và transfer
 *     tags: [Analyst]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /analyst/threebestsellingproducts:
 *   get:
 *     summary: 3 sản phẩm bán chạy nhất
 *     description: 3 sản phẩm bán chạy nhất
 *     tags: [Analyst]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
