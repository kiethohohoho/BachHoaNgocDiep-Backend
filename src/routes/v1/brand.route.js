const express = require('express');
const validate = require('../../middlewares/validate');
const { brandValidation } = require('../../validations');
const { brandController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/brands')
  .get(auth('getBrands'), validate(brandValidation.getBrands), brandController.getBrands)
  .post(auth('manageBrands'), validate(brandValidation.createBrand), brandController.createBrand);

router
  .route('/brands/:brandId')
  .get(
    auth('getBrands'),
    validate(brandValidation.getOrDeleteBrandById),
    brandController.getBrandById
  )
  .patch(
    auth('manageBrands'),
    validate(brandValidation.updateBrandById),
    brandController.updateBrandById
  )
  .delete(
    auth('manageBrands'),
    validate(brandValidation.getOrDeleteBrandById),
    brandController.deleteBrandById
  );

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Thương hiệu
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Lấy danh sách thương hiệu (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /brands?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Brands]
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
 *                     $ref: '#/components/schemas/Brand'
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
 *     summary: Tạo mới một thương hiệu
 *     description: Tạo trước Nhóm danh mục và Danh mục sản phẩm (nếu cần)
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandid
 *               - name
 *               - price
 *               - quantity
 *             properties:
 *               brandid:
 *                 type: string
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
 *               brandid: "1"
 *               categoryid: "1"
 *               categorygroupid: "1"
 *               name: Sữa tiệt trùng ColosBaby
 *               price: 80.9
 *               quantity: 36
 *     responses:
 *       "201":
 *         description: Tạo thương hiệu thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Brand'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /brands/{brandId}:
 *   get:
 *     summary: Lấy thông tin một thương hiệu
 *     description: Bao gồm cả thông tin Nhóm danh mục và Danh mục sản phẩm (nếu có)
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Brand'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một thương hiệu
 *     description: Cập nhật thông tin của một thương hiệu
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandid:
 *                 type: string
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
 *               brandid: "1"
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
 *                $ref: '#/components/schemas/Brand'
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
 *     summary: Xoá một thương hiệu
 *     description: Thao tác này chỉ "xoá mềm" một thương hiệu, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand Id
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
