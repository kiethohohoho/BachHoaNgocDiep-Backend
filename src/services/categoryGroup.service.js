/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { CategoryGroup, Category } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for categoryGroups
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryCategoryGroups = async (query) => {
  const categoryGroups = await paginate(CategoryGroup, query);
  return categoryGroups;
};

/**
 * Query for one categoryGroup by Id
 * @param {Object} params - Request params
 * @returns {Promise<QueryResult>}
 */
const queryCategoryGroupById = async (categoryGroupId) => {
  const categoryGroup = await CategoryGroup.findByPk(categoryGroupId, {
    include: [Category, CategoryGroup],
  });
  if (!categoryGroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhóm danh mục không tồn tại!');
  }
  return categoryGroup;
};

/**
 * Change record value and save
 * @param {CategoryGroup} categoryGroup - categoryGroup record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveCategoryGroup = async (categoryGroup, body) => {
  const { name, description } = body;
  if (name) {
    categoryGroup.Name = name;
  }
  if (description) {
    categoryGroup.Description = description;
  }
  await categoryGroup.save();
};

/**
 * Destroy a record
 * @param {CategoryGroup} categoryGroup - categoryGroup record
 * @returns {Promise<DestroyResult>}
 */
const destroyCategoryGroup = async (categoryGroup) => {
  await categoryGroup.destroy();
};

/**
 * Create one categoryGroup
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneCategoryGroup = async (body) => {
  // console.log(333333333333333333333333333333333333);
  const { name, description } = body;

  if (name) {
    const existCategoryGroup = await CategoryGroup.findOne({
      where: { Name: name },
    });
    if (existCategoryGroup) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Nhóm danh mục này đã tồn tại!');
    }
  }

  const newCategoryGroup = await CategoryGroup.create({
    Name: name,
    Description: description,
  });
  return newCategoryGroup;
};

module.exports = {
  queryCategoryGroups,
  queryCategoryGroupById,
  saveCategoryGroup,
  destroyCategoryGroup,
  createOneCategoryGroup,
};
