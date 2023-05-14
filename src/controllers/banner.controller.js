const httpStatus = require('http-status');
const {
  queryBanners,
  queryBannerById,
  createOneBanner,
  saveBanner,
  destroyBanner,
} = require('../services/banner.service');
const catchAsync = require('../utils/catchAsync');

const getBanners = catchAsync(async (req, res) => {
  try {
    const Banners = await queryBanners(req.query);
    res.status(httpStatus.OK).json({ Banners, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách banner!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getBannerById = async (req, res) => {
  try {
    const banner = await queryBannerById(req.params.bannerId);
    return res.status(httpStatus.OK).json({ banner, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm banner!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateBannerById = async (req, res) => {
  try {
    const banner = await queryBannerById(req.params.bannerId);
    await saveBanner(banner, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm banner!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteBannerById = async (req, res) => {
  try {
    const banner = await queryBannerById(req.params.bannerId);
    await destroyBanner(banner);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá banner!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createBanner = catchAsync(async (req, res) => {
  try {
    const createdBanner = await createOneBanner(req.body);
    if (createdBanner) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo banner thành công!', success: true, ...createdBanner });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo banner!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getBanners,
  getBannerById,
  updateBannerById,
  deleteBannerById,
  createBanner,
};
