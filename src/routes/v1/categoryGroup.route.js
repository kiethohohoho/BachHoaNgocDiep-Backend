const express = require('express');
const validate = require('../../middlewares/validate');
const { categoryGroupValidation } = require('../../validations');
const { categoryGroupController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/categoryGroups')
  .get(
    auth('getCategoryGroups'),
    validate(categoryGroupValidation.getCategoryGroups),
    categoryGroupController.getCategoryGroups
  )
  .post(
    auth('manageCategoryGroups'),
    validate(categoryGroupValidation.createCategoryGroup),
    categoryGroupController.createCategoryGroup
  );

router
  .route('/categoryGroups/:categoryGroupId')
  .get(
    auth('getCategoryGroups'),
    validate(categoryGroupValidation.getOrDeleteCategoryGroupById),
    categoryGroupController.getCategoryGroupById
  )
  .patch(
    auth('manageCategoryGroups'),
    validate(categoryGroupValidation.updateCategoryGroupById),
    categoryGroupController.updateCategoryGroupById
  )
  .delete(
    auth('manageCategoryGroups'),
    validate(categoryGroupValidation.getOrDeleteCategoryGroupById),
    categoryGroupController.deleteCategoryGroupById
  );

/**
 * @swagger
 * tags:
 *   name: CategoryGroups
 *   description: Nhóm danh mục
 */

/**
 * @swagger
 * /categoryGroups:
 *   get:
 *     summary: Lấy danh sách nhóm danh mục (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /categoryGroups?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [CategoryGroups]
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
 *                     $ref: '#/components/schemas/CategoryGroup'
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
 *     summary: Tạo mới một nhóm danh mục
 *     description: Tạo trước Nhóm danh mục và Danh mục sản phẩm (nếu cần)
 *     tags: [CategoryGroups]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Sữa tiệt trùng ColosBaby
 *               description: Sữa tiệt trùng ColosBaby
 *     responses:
 *       "201":
 *         description: Tạo nhóm danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CategoryGroup'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /categoryGroups/{categoryGroupId}:
 *   get:
 *     summary: Lấy thông tin một nhóm danh mục
 *     description: Bao gồm cả thông tin Nhóm danh mục và Danh mục sản phẩm (nếu có)
 *     tags: [CategoryGroups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryGroupId
 *         required: true
 *         schema:
 *           type: string
 *         description: CategoryGroup Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CategoryGroup'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một nhóm danh mục
 *     description: Cập nhật thông tin của một nhóm danh mục
 *     tags: [CategoryGroups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryGroupId
 *         required: true
 *         schema:
 *           type: string
 *         description: CategoryGroup Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Sữa tiệt trùng ColosBaby
 *               description: Sữa tiệt trùng ColosBaby
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CategoryGroup'
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
 *     summary: Xoá một nhóm danh mục
 *     description: Thao tác này chỉ "xoá mềm" một nhóm danh mục, vẫn có thể khôi phục sau khi xoá.
 *     tags: [CategoryGroups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryGroupId
 *         required: true
 *         schema:
 *           type: string
 *         description: CategoryGroup Id
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
 *                     $ref: '#/components/schemas/CategoryGroup'
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
