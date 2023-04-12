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
 * @param {Object} params - Request params
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
 * @param {Brand} brand - brand record
 * @returns {Promise<DestroyResult>}
 */
const destroyBrand = async (brand) => {
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

module.exports = { queryBrands, queryBrandById, saveBrand, destroyBrand, createOneBrand };
