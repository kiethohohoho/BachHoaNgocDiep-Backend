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
  const { name, description } = body;

  // await CategoryGroup.create({
  //   Id: categoryGroupid,
  //   CategoryId: categoryid,
  //   CategoryGroupId: categorygroupid,
  //   Name: 'test',
  // });
  // await Category.create({ Id: categoryid, CategoryGroupId: categorygroupid, Name: 'test' });
  // await CategoryGroup.create({ Id: categorygroupid, Name: 'test' });

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