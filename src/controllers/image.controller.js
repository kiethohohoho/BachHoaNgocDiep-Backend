const httpStatus = require('http-status');
const {
  queryImages,
  queryImageById,
  saveImage,
  destroyImage,
  queryImagesByProductId,
} = require('../services/image.service');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../config/cloudinary');
const { Image } = require('../models');
const ApiError = require('../utils/ApiError');

const getImages = catchAsync(async (req, res) => {
  try {
    const Images = await queryImages(req.query);
    res.status(httpStatus.OK).json({ Images, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách hình ảnh!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getImagesById = async (req, res) => {
  try {
    const image = await queryImageById(req.params.imageId);
    return res.status(httpStatus.OK).json({ image, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm hình ảnh!',
      detail: err.message || err,
      success: false,
    });
  }
};

const getImagesByProductId = async (req, res) => {
  try {
    const image = await queryImagesByProductId(req.params.productId);
    return res.status(httpStatus.OK).json({ image, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm hình ảnh!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateImageById = async (req, res) => {
  try {
    const image = await queryImageById(req.params.imageId);
    await saveImage(image, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm hình ảnh!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteImageById = async (req, res) => {
  try {
    const image = await queryImageById(req.params.imageId);
    await destroyImage(image);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá hình ảnh!',
      detail: err.message || err,
      success: false,
    });
  }
};

const uploadImage = catchAsync(async (req, res) => {
  try {
    const imageList = [];
    await Promise.all(
      req.files.map((file, index) =>
        cloudinary.uploader
          .upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
              throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                `Error uploading file to Cloudinary: ${error}`
              );
            } else {
              Image.create({
                CloudinaryPublicId: result.public_id,
                FileName: req.files[index].originalname,
                FileSize: result.bytes,
                FileType: result.format,
                OriginalImageUrl: cloudinary.url(result.public_id),
                SmallImageUrl: cloudinary.url(result.public_id, {
                  width: 200,
                  height: 200,
                  crop: 'fill',
                }),
                MediumImageUrl: cloudinary.url(result.public_id, {
                  width: 400,
                  height: 400,
                  crop: 'fill',
                }),
                BigImageUrl: cloudinary.url(result.public_id, {
                  width: 800,
                  height: 800,
                  crop: 'fill',
                }),
              }).then((a) => {
                imageList.push(a);
                if (imageList.length === req.files.length) {
                  res.status(httpStatus.OK).json({
                    message: 'Upload hình ảnh thành công!',
                    success: true,
                    images: imageList,
                  });
                }
              });
            }
          })
          .end(file.buffer)
      )
    );
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi upload hình ảnh!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getImages,
  getImagesById,
  getImagesByProductId,
  updateImageById,
  deleteImageById,
  uploadImage,
};
