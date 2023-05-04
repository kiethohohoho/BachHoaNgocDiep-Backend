const express = require('express');
const validate = require('../../middlewares/validate');
const { reviewValidation } = require('../../validations');
const { reviewController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth('getReviews'), validate(reviewValidation.getReviews), reviewController.getReviews)
  .post(
    auth('manageReviews'),
    validate(reviewValidation.createReview),
    reviewController.createReview
  );

router
  .route('/:reviewId')
  .get(
    auth('getReviews'),
    validate(reviewValidation.getOrDeleteReviewById),
    reviewController.getReviewById
  )
  .patch(
    auth('manageReviews'),
    validate(reviewValidation.updateReviewById),
    reviewController.updateReviewById
  )
  .delete(
    auth('manageReviews'),
    validate(reviewValidation.getOrDeleteReviewById),
    reviewController.deleteReviewById
  );

router
  .route('/product/:productId')
  .get(
    auth('getReviews'),
    validate(reviewValidation.getReviewByProduct),
    reviewController.getReviewByProduct
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Lấy danh sách review (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /reviews?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Reviews]
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
 *                     $ref: '#/components/schemas/Review'
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
 *     summary: Tạo mới một review
 *     description: Tạo trước Nhóm review và Review sản phẩm (nếu cần)
 *     tags: [Reviews]
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
 *         description: Tạo review thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
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
 * /reviews/{reviewId}:
 *   get:
 *     summary: Lấy thông tin một review theo Id
 *     description: Lấy thông tin một review theo Id
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: review Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một review
 *     description: Cập nhật thông tin của một review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Review Id
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
 *               $ref: '#/components/schemas/Review'
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
 *     summary: Xoá một review
 *     description: Thao tác này chỉ "xoá mềm" một review, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: Review Id
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
 * /product/:productId:
 *   get:
 *     summary: Lấy danh sách review theo productId
 *     description: Lấy danh sách review theo productId
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
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
 *                     $ref: '#/components/schemas/Review'
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
