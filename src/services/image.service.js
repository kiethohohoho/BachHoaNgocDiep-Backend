/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Image, Product } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for images
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryImages = async (query) => {
  const images = await paginate(Image, query);
  return images;
};

/**
 * Query for one image by Id
 * @param {string} imageId - Image Id
 * @returns {Promise<QueryResult>}
 */
const queryImageById = async (imageId) => {
  const image = await Image.findByPk(imageId, {
    include: [Product],
  });
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hình ảnh không tồn tại!');
  }
  return image;
};

/**
 * Query for one image by Product Id
 * @param {string} productId - Product Id
 * @returns {Promise<QueryResult>}
 */
const queryImagesByProductId = async (productId) => {
  const images = await Image.findAll({ where: { ProductId: productId }, include: [Product] });
  if (!images) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hình ảnh không tồn tại!');
  }
  return images;
};

/**
 * Change record value and save
 * @param {Image} image - image record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveImage = async (image, body) => {
  const { categoryid, categorygroupid, name, description } = body;
  if (categoryid) {
    image.CategoryId = categoryid;
  }
  if (categorygroupid) {
    image.CategoryGroupId = categorygroupid;
  }
  if (name) {
    image.Name = name;
  }
  if (description) {
    image.Description = description;
  }
  await image.save();
};

/**
 * Destroy a record
 * @param {Image} image - image record
 * @returns {Promise<DestroyResult>}
 */
const destroyImage = async (image) => {
  await image.destroy();
};

/**
 * Create one image
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneImage = async () => {
  try {
    // loop through the uploaded files and upload them to Cloudinary
    // await Promise.all(
    //   files.map((file, index) =>
    //     cloudinary.uploader
    //       .upload_stream({ resource_type: 'auto' }, (error, result) => {
    //         if (error) {
    //           throw new ApiError(
    //             httpStatus.INTERNAL_SERVER_ERROR,
    //             `Error uploading file to Cloudinary: ${error}`
    //           );
    //         } else {
    //           Image.create({
    //             CloudinaryPublicId: result.public_id,
    //             FileName: files[index].originalname,
    //             FileSize: result.bytes,
    //             FileType: result.format,
    //             OriginalImageUrl: cloudinary.url(result.public_id),
    //             SmallImageUrl: cloudinary.url(result.public_id, {
    //               width: 200,
    //               height: 200,
    //               crop: 'fill',
    //             }),
    //             MediumImageUrl: cloudinary.url(result.public_id, {
    //               width: 400,
    //               height: 400,
    //               crop: 'fill',
    //             }),
    //             BigImageUrl: cloudinary.url(result.public_id, {
    //               width: 800,
    //               height: 800,
    //               crop: 'fill',
    //             }),
    //           });
    //         }
    //       })
    //       .end(file.buffer)
    //   )
    // );
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error uploading images: ${error}`);
  }
};

module.exports = {
  queryImages,
  queryImageById,
  queryImagesByProductId,
  saveImage,
  destroyImage,
  createOneImage,
};
