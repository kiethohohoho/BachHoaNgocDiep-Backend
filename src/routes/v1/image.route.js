const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const { imageValidation } = require('../../validations');
const { imageController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();
const upload = multer();

router
  .route('/')
  .get(auth('getImages'), validate(imageValidation.getImages), imageController.getImages)
  .post(
    auth('uploadImages'),
    upload.array('image'),
    validate(imageValidation.uploadImage),
    imageController.uploadImage
  );

router
  .route('/:imageId')
  .get(
    auth('getImages'),
    validate(imageValidation.getOrDeleteImageById),
    imageController.getImagesById
  )
  .patch(
    auth('manageImages'),
    validate(imageValidation.updateImageById),
    imageController.updateImageById
  )
  .delete(
    auth('manageImages'),
    validate(imageValidation.getOrDeleteImageById),
    imageController.deleteImageById
  );

router.get(
  '/images/product/:productId',
  auth('getImages'),
  validate(imageValidation.getImagesByProductIdy),
  imageController.getImagesByProductId
);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Hình ảnh
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Lấy danh sách hình ảnh (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /images?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Images]
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
 *                     $ref: '#/components/schemas/Image'
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
 *     summary: Upload file
 *     description: Upload file
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     produces:
 *       - application/json
 *     responses:
 *       "201":
 *         description: Upload hình ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
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
 * /images/{imageId}:
 *   get:
 *     summary: Lấy thông tin một hình ảnh
 *     description: Bao gồm cả thông tin sản phẩm (nếu có)
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật thông tin hình ảnh
 *     description: Cập nhật thông tin của một hình ảnh
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductId:
 *                 type: string
 *               FileName:
 *                 type: string
 *             example:
 *               ProductId: "1"
 *               FileName: "hihihi"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
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
 *     summary: Xoá một hình ảnh
 *     description: Thao tác này chỉ "xoá mềm" một hình ảnh, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image Id
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
 * /images/product/{productId}:
 *   get:
 *     summary: Lấy danh sách hình ảnh theo productId
 *     description: Lấy danh sách hình ảnh theo productId
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
