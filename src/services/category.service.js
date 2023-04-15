/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Category, CategoryGroup } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

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
  return category;
};

/**
 * Query for one category by Id
 * @param {string} categoryGroupId - CategoryGroupId
 * @returns {Promise<QueryResult>}
 */
const queryCategoriesByCategoryGroupId = async (categoryGroupId) => {
  const categories = await Category.findAll({ where: { CategoryGroupId: categoryGroupId } });
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
