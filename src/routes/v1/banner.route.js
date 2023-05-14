const express = require('express');
const validate = require('../../middlewares/validate');
const { bannerValidation } = require('../../validations');
const { bannerController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(validate(bannerValidation.getBanners), bannerController.getBanners)
  .post(auth('admin'), validate(bannerValidation.createBanner), bannerController.createBanner);

router
  .route('/:bannerId')
  .get(
    auth('user'),
    validate(bannerValidation.getOrDeleteBannerById),
    bannerController.getBannerById
  )
  .patch(
    auth('admin'),
    validate(bannerValidation.updateBannerById),
    bannerController.updateBannerById
  )
  .delete(
    auth('admin'),
    validate(bannerValidation.getOrDeleteBannerById),
    bannerController.deleteBannerById
  );

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner
 */

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Lấy danh sách banner (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /banners?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Banners]
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
 *
 *   post:
 *     summary: Tạo mới một banner
 *     description: Tạo trước Banner và Danh mục sản phẩm (nếu cần)
 *     tags: [Banners]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               redirecturl:
 *                 type: string
 *               images:
 *                 type: array
 *             example:
 *               title: "Banner 1"
 *               description: "Test"
 *               redirecturl: "Link fb"
 *               images: [{}]
 *     responses:
 *       "201":
 *         description: Tạo banner thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Banner'
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
 * /banners/{bannerId}:
 *   get:
 *     summary: Lấy thông tin một banner
 *     description: Bao gồm cả thông tin Banner và Danh mục sản phẩm (nếu có)
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Banner'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một banner
 *     description: Cập nhật thông tin của một banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               redirecturl:
 *                 type: string
 *               images:
 *                 type: array
 *             example:
 *               title: "Banner 1"
 *               description: "Test"
 *               redirecturl: "Link fb"
 *               images: [{}]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Banner'
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
 *     summary: Xoá một banner
 *     description: Thao tác này chỉ "xoá mềm" một banner, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner Id
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
module.exports = router;
