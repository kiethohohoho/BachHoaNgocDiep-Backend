const httpStatus = require('http-status');
const {
  queryCategoryGroups,
  queryCategoryGroupById,
  createOneCategoryGroup,
  saveCategoryGroup,
  destroyCategoryGroup,
} = require('../services/categoryGroup.service');
const catchAsync = require('../utils/catchAsync');

const getCategoryGroups = catchAsync(async (req, res) => {
  try {
    const CategoryGroups = await queryCategoryGroups(req.query);
    res.status(httpStatus.OK).json({ CategoryGroups, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách nhóm danh mục!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getCategoryGroupById = async (req, res) => {
  try {
    const categoryGroup = await queryCategoryGroupById(req.params.categoryGroupId);
    return res.status(httpStatus.OK).json({ categoryGroup, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm nhóm danh mục!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateCategoryGroupById = async (req, res) => {
  try {
    const categoryGroup = await queryCategoryGroupById(req.params.categoryGroupId);
    await saveCategoryGroup(categoryGroup, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm nhóm danh mục!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteCategoryGroupById = async (req, res) => {
  try {
    const categoryGroup = await queryCategoryGroupById(req.params.categoryGroupId);
    await destroyCategoryGroup(categoryGroup);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá nhóm danh mục!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createCategoryGroup = catchAsync(async (req, res) => {
  try {
    const createdCategoryGroup = await createOneCategoryGroup(req.body);
    if (createdCategoryGroup) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo nhóm danh mục thành công!', success: true, ...createdCategoryGroup });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo nhóm danh mục!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getCategoryGroups,
  getCategoryGroupById,
  updateCategoryGroupById,
  deleteCategoryGroupById,
  createCategoryGroup,
};
