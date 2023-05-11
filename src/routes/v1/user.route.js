const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const { userValidation } = require('../../validations');

const router = express.Router();

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
