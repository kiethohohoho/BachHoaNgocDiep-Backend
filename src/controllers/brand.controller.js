const httpStatus = require('http-status');
const {
  queryBrands,
  queryBrandById,
  createOneBrand,
  saveBrand,
  destroyBrand,
  queryBrandsByCategoryId,
} = require('../services/brand.service');
const catchAsync = require('../utils/catchAsync');

const getBrands = catchAsync(async (req, res) => {
  try {
    const Brands = await queryBrands(req.query);
    res.status(httpStatus.OK).json({ Brands, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách thương hiệu!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getBrandById = async (req, res) => {
  try {
    const brand = await queryBrandById(req.params.brandId);
    return res.status(httpStatus.OK).json({ brand, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm thương hiệu!',
      detail: err.message || err,
      success: false,
    });
  }
};

const getBrandsByCategoryId = async (req, res) => {
  try {
    const brands = await queryBrandsByCategoryId(req.params.brandId);
    return res.status(httpStatus.OK).json({ brands, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm thương hiệu!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateBrandById = async (req, res) => {
  try {
    const brand = await queryBrandById(req.params.brandId);
    await saveBrand(brand, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm thương hiệu!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteBrandById = async (req, res) => {
  try {
    const brand = await queryBrandById(req.params.brandId);
    await destroyBrand(brand);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá thương hiệu!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createBrand = catchAsync(async (req, res) => {
  try {
    const createdBrand = await createOneBrand(req.body);
    if (createdBrand) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo thương hiệu thành công!', success: true, ...createdBrand });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo thương hiệu!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getBrands,
  getBrandById,
  getBrandsByCategoryId,
  updateBrandById,
  deleteBrandById,
  createBrand,
};
