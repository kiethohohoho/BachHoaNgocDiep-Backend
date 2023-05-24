const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const { userValidation } = require('../../validations');

const router = express.Router();

router.route('/').get(auth('admin'), validate(userValidation.getUsers), userController.getUsers);
// .patch(auth('user'), validate(userValidation.updateProfile), userController.updateUserProfile);

router
  .route('/profile')
  .get(auth('user'), userController.getUserProfile)
  .patch(auth('user'), validate(userValidation.updateProfile), userController.updateUserProfile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách user (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /users?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Users]
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
 *                     $ref: '#/components/schemas/Banner'
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

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile.
 *     description: Get user profile.
 *     tags: [Users]
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
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   patch:
 *     summary: Cập nhật profile
 *     description: Cập nhật thông tin của user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 format: email
 *               lastname:
 *                 type: string
 *               dateofbirth:
 *                 type: DATE
 *               gender:
 *                 type: string
 *               avatar:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *             example:
 *               firstname: "Lê"
 *               lastname: "Tấn Kiệt"
 *               dateofbirth: 10/02/2001
 *               gender: true
 *               avatar: "url ảnh"
 *               phonenumber: "0347057544"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               success: true
 */
