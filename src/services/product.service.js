/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Product, Brand, Category, CategoryGroup } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
// const logger = require('../config/logger');

/**
 * Query for products
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (query) => {
  const products = await paginate(Product, query);
  return products;
};

/**
 * Query for one product by Id
 * @param {Object} params - Request params
 * @returns {Promise<QueryResult>}
 */
const queryProductById = async (productId) => {
  const product = await Product.findByPk(productId, {
    include: [Brand, Category, CategoryGroup],
  });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sản phẩm không tồn tại!');
  }
  return product;
};

/**
 * Change record value and save
 * @param {Product} product - product record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveProduct = async (product, body) => {
  const { brandid, categoryid, categorygroupid, name, description, price } = body;
  if (brandid) {
    product.BrandId = brandid;
  }
  if (categoryid) {
    product.CategoryId = categoryid;
  }
  if (categorygroupid) {
    product.CategoryGroupId = categorygroupid;
  }
  if (name) {
    product.Name = name;
  }
  if (description) {
    product.Description = description;
  }
  if (price) {
    product.Price = price;
  }
  await product.save();
};

/**
 * Destroy a record
 * @param {Product} product - product record
 * @returns {Promise<DestroyResult>}
 */
const destroyProduct = async (product) => {
  await product.destroy();
};

/**
 * Create one product
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneProduct = async (body) => {
  const { brandid, categoryid, categorygroupid, name, description, price } = body;

  // await Brand.create({
  //   Id: brandid,
  //   CategoryId: categoryid,
  //   CategoryGroupId: categorygroupid,
  //   Name: 'test',
  // });
  // await Category.create({ Id: categoryid, CategoryGroupId: categorygroupid, Name: 'test' });
  // await CategoryGroup.create({ Id: categorygroupid, Name: 'test' });

  const newProduct = await Product.create({
    BrandId: brandid,
    CategoryId: categoryid,
    CategoryGroupId: categorygroupid,
    Name: name,
    Description: description,
    Price: price,
  });
  return newProduct;
};

module.exports = { queryProducts, queryProductById, saveProduct, destroyProduct, createOneProduct };
