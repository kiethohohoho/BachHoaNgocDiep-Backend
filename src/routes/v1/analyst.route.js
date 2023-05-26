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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
