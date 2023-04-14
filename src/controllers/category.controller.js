const httpStatus = require('http-status');
const {
  queryCategories,
  queryCategoryById,
  createOneCategory,
  saveCategory,
  destroyCategory,
  queryCategoryByCategoryGroupId,
} = require('../services/category.service');
const catchAsync = require('../utils/catchAsync');

const getCategories = catchAsync(async (req, res) => {
  try {
    const Categories = await queryCategories(req.query);
    res.status(httpStatus.OK).json({ Categories, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách danh mục!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getCategoryByCategoryGroupId = async (req, res) => {
  try {
    const category = await queryCategoryByCategoryGroupId(req.params.categoryGroupId);
    return res.status(httpStatus.OK).json({ category, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm danh mục!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const category = await queryCategoryById(req.params.categoryId);
    await saveCategory(category, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm danh mục!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const category = await queryCategoryById(req.params.categoryId);
    await destroyCategory(category);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá danh mục!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createCategory = catchAsync(async (req, res) => {
  try {
    const createdCategory = await createOneCategory(req.body);
    if (createdCategory) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo danh mục thành công!', success: true, ...createdCategory });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo danh mục!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getCategories,
  getCategoryByCategoryGroupId,
  updateCategoryById,
  deleteCategoryById,
  createCategory,
};
