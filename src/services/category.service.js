/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const he = require('he');
const { Category, CategoryGroup } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');

/**
 * Query for categories
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (query) => {
  const categories = await paginate(Category, query);
  return categories;
};

/**
 * Query for one category by Id
 * @param {string} categoryId - categoryId
 * @returns {Promise<QueryResult>}
 */
const queryCategoryById = async (categoryId) => {
  const category = await Category.findByPk(categoryId, {
    include: [CategoryGroup],
  });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Danh mục không tồn tại!');
  }
  const clonedCategory = JSON.parse(JSON.stringify(category));
  clonedCategory.Description = he.decode(clonedCategory.Description);
  return clonedCategory;
};

/**
 * Query for one category by Id
 * @param {string} categoryGroupId - CategoryGroupId
 * @returns {Promise<QueryResult>}
 */
const queryCategoriesByCategoryGroupId = async (categoryGroupId) => {
  const categories = await Category.findAll({
    where: { CategoryGroupId: categoryGroupId },
    include: [CategoryGroup],
  });
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Danh mục không tồn tại!');
  }
  return categories;
};

/**
 * Change record value and save
 * @param {Category} category - category record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveCategory = async (category, body) => {
  const { categorygroupid, name, description } = body;
  if (categorygroupid) {
    category.CategoryGroupId = categorygroupid;
  }
  if (name) {
    category.Name = name;
  }
  if (description) {
    category.Description = description;
  }
  await category.save();
};

/**
 * Destroy a record
 * @param {Category} category - category record
 * @returns {Promise<DestroyResult>}
 */
const destroyCategory = async (category) => {
  await category.destroy();
};

/**
 * Create one category
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneCategory = async (body) => {
  const { categorygroupid, name, description } = body;

  if (name && categorygroupid) {
    const existCategory = await Category.findOne({
      where: { Name: name, CategoryGroupId: categorygroupid },
    });
    if (existCategory) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Danh mục này đã tồn tại!');
    }
  }

  const newCategory = await Category.create({
    CategoryGroupId: categorygroupid,
    Name: name,
    Description: description,
  });
  return newCategory;
};

module.exports = {
  queryCategories,
  queryCategoryById,
  queryCategoriesByCategoryGroupId,
  saveCategory,
  destroyCategory,
  createOneCategory,
};
