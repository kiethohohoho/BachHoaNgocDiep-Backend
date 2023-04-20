const express = require('express');
const validate = require('../../middlewares/validate');
const { addressValidation } = require('../../validations');
const { addressController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth('getAddresss'), validate(addressValidation.getAddresss), addressController.getAddresss)
  .post(
    auth('manageAddresss'),
    validate(addressValidation.createAddress),
    addressController.createAddress
  );

router
  .route('/:addressId')
  .get(
    auth('getAddresss'),
    validate(addressValidation.getOrDeleteAddressById),
    addressController.getAddressById
  )
  .patch(
    auth('manageAddresss'),
    validate(addressValidation.updateAddressById),
    addressController.updateAddressById
  )
  .delete(
    auth('manageAddresss'),
    validate(addressValidation.getOrDeleteAddressById),
    addressController.deleteAddressById
  );

/**
 * @swagger
 * tags:
 *   name: Addresss
 *   description: Địa chỉ
 */

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Lấy danh sách địa chỉ (search, sort, filter, pagination)
 *     description: Cho phép search, sort, multi filter, phân trang /addresses?search=a&sort=Price,Name&order=asc,desc&filter[Price][gt]=1&filter[Name][eq]=abc&page=1&limit=20.
 *     tags: [Addresss]
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
 *                     $ref: '#/components/schemas/Address'
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
 *     summary: Tạo mới một địa chỉ
 *     description: Tạo trước Nhóm danh mục, Danh mục và Thương hiệu địa chỉ (nếu cần), upload ảnh cho địa chỉ
 *     tags: [Addresss]
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
 *               - isdefault
 *               - city
 *               - district
 *               - ward
 *               - street
 *             properties:
 *               name:
 *                 type: string
 *               isdefault:
 *                 type: string
 *               city:
 *                 type: string
 *               district:
 *                 type: string
 *               ward:
 *                 type: string
 *               street:
 *                 type: string
 *             example:
 *               name: "text"
 *               isdefault: "text"
 *               city: "text"
 *               district: "text"
 *               ward: "text"
 *               street: "text"
 *     responses:
 *       "201":
 *         description: Tạo địa chỉ thành công
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Address'
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
 * /addresses/{addressId}:
 *   get:
 *     summary: Lấy thông tin một địa chỉ
 *     description: Bao gồm cả thông tin Nhóm danh mục, Danh mục và Thương hiệu địa chỉ (nếu có)
 *     tags: [Addresss]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: Address Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Address'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Cập nhật một địa chỉ
 *     description: Cập nhật thông tin của một địa chỉ
 *     tags: [Addresss]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: Address Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isdefault:
 *                 type: string
 *               city:
 *                 type: string
 *               district:
 *                 type: string
 *               ward:
 *                 type: string
 *               street:
 *                 type: string
 *             example:
 *               name: "text"
 *               isdefault: "text"
 *               city: "text"
 *               district: "text"
 *               ward: "text"
 *               street: "text"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Address'
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
 *     summary: Xoá một địa chỉ
 *     description: Thao tác này chỉ "xoá mềm" một địa chỉ, vẫn có thể khôi phục sau khi xoá.
 *     tags: [Addresss]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: Address Id
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
