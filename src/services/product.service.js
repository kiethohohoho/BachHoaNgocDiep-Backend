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
const queryProductById = async (params) => {
  const { productId } = params;
  const product = await Product.findByPk(productId, {
    include: [Brand, Category, CategoryGroup],
  });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sản phẩm không tồn tại!');
  }
  // const { BrandId, CategoryId, CategoryGroupId } = product;
  // const [BrandRes, CategoryRes, CategoryGroupRes] = await Promise.all(
  //   Brand.findByPk(BrandId),
  //   Category.findByPk(CategoryId),
  //   CategoryGroup.findByPk(CategoryGroupId)
  // );

  // return {
  //   ...product,
  //   Brand: BrandRes,
  //   Category: CategoryRes,
  //   CategoryGroup: CategoryGroupRes,
  // };
  return product;
};

/**
 * Create one product
 * @param {Object} body - Request body
 * @returns {Promise<CreateResult>}
 */
const createOneProduct = async (body) => {
  const { a } = body;
  return a;
};

module.exports = { queryProducts, queryProductById, createOneProduct };
