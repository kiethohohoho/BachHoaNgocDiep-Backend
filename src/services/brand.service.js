/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Brand, Category, CategoryGroup } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for brands
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryBrands = async (query) => {
  const brands = await paginate(Brand, query);
  return brands;
};

/**
 * Query for one brand by Id
 * @param {string} brandId - brandId
 * @returns {Promise<QueryResult>}
 */
const queryBrandById = async (brandId) => {
  const brand = await Brand.findByPk(brandId, {
    include: [Category, CategoryGroup],
  });
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thương hiệu không tồn tại!');
  }
  return brand;
};

/**
 * Query for all brand by categoryId
 * @param {string} categoryId - categoryId
 * @returns {Promise<QueryResult>}
 */
const queryBrandsByCategoryId = async (categoryId) => {
  const brands = await Brand.findAll({
    where: { CategoryId: categoryId },
    include: [Category, CategoryGroup],
  });
  if (!brands) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thương hiệu không tồn tại!');
  }
  return brands;
};

/**
 * Change record value and save
 * @param {Brand} brand - brand record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveBrand = async (brand, body) => {
  const { categoryid, categorygroupid, name, description } = body;
  if (categoryid) {
    brand.CategoryId = categoryid;
  }
  if (categorygroupid) {
    brand.CategoryGroupId = categorygroupid;
  }
  if (name) {
    brand.Name = name;
  }
  if (description) {
    brand.Description = description;
  }
  await brand.save();
};

/**
 * Destroy a record
 * @param {string} brandId - brandId
 * @returns {Promise<DestroyResult>}
 */
const destroyBrand = async (brandId) => {
  const brand = await Brand.findByPk(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Thương hiệu này không tồn tại!');
  }
  await brand.destroy();
};

/**
 * Create one brand
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneBrand = async (body) => {
  const { categoryid, categorygroupid, name, description } = body;

  // await Brand.create({
  //   Id: brandid,
  //   CategoryId: categoryid,
  //   CategoryGroupId: categorygroupid,
  //   Name: 'test',
  // });
  // await Category.create({ Id: categoryid, CategoryGroupId: categorygroupid, Name: 'test' });
  // await CategoryGroup.create({ Id: categorygroupid, Name: 'test' });

  const newBrand = await Brand.create({
    CategoryId: categoryid,
    CategoryGroupId: categorygroupid,
    Name: name,
    Description: description,
  });
  return newBrand;
};

module.exports = {
  queryBrands,
  queryBrandById,
  queryBrandsByCategoryId,
  saveBrand,
  destroyBrand,
  createOneBrand,
};
