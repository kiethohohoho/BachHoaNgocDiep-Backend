const express = require('express');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');
const { categoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/categories')
  .get(
    auth('getCategories'),
    validate(categoryValidation.getCategories),
    categoryController.getCategories
  )
  .post(
    auth('manageCategories'),
    validate(categoryValidation.createCategory),
    categoryController.createCategory
  );

router
  .route('/categories/:categoryId')
  .get(
    auth('getCategories'),
    validate(categoryValidation.getOrDeleteCategoryById),
    categoryController.getCategoryById
  )
  .patch(
    auth('manageCategories'),
    validate(categoryValidation.updateCategoryById),
    categoryController.updateCategoryById
  )
  .delete(
    auth('manageCategories'),
    validate(categoryValidation.getOrDeleteCategoryById),
    categoryController.deleteCategoryById
  );

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Danh mục
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lấy danh sách danh mục (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /categories?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Categories]
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
 *                     $ref: '#/components/schemas/Category'
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
 *
 *   post:
 *     summary: Tạo mới một danh mục
 *     description: Tạo trước Nhóm danh mục và Danh mục sản phẩm (nếu cần)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryid
 *               - name
 *               - price
 *               - quantity
 *             properties:
 *               categoryid:
 *                 type: string
 *               categorygroupid:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: decimal
 *                 min: 0
 *               quantity:
 *                 type: number
 *                 format: integer
 *                 min: 0
 *             example:
 *               categoryid: "1"
 *               categorygroupid: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               price: 80.9
 *               quantity: 36
 *     responses:
 *       "201":
 *         description: Tạo danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Lấy thông tin một danh mục
 *     description: Bao gồm cả thông tin Nhóm danh mục và Danh mục sản phẩm (nếu có)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
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
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category Id
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
 *               price:
 *                 type: number
 *                 format: decimal
 *                 min: 0
 *               rate:
 *                 type: number
 *                 format: decimal
 *                 min: 0
 *                 max: 5
 *               quantity:
 *                 type: number
 *                 format: integer
 *                 min: 0
 *             example:
 *               categoryid: "1"
 *               categorygroupid: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               description: Sữa ngon vạn người mê
 *               price: 80.9
 *               rate: 4.5
 *               quantity: 36
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
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
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category Id
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
module.exports = router;
