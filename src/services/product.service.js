/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const he = require('he');
const { Product, Brand, Category, CategoryGroup, Image, Review } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');

/**
 * Query for products
 * @param {Object} query - Request query
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (query) => {
  const products = await paginate(Product, query);
  // const images = await Image.findAll({
  //   where: { ProductId: productId },
  // });
  return products;
};

/**
 * Query for one product by Id
 * @param {Object} params - Request params
 * @returns {Promise<QueryResult>}
 */
const queryProductById = async (productId) => {
  const [product, images, count] = await Promise.all([
    Product.findByPk(productId, {
      include: [Brand, Category, CategoryGroup],
    }),
    Image.findAll({
      where: { ProductId: productId },
    }),
    Review.count({ where: { ProductId: productId } }),
  ]);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sản phẩm không tồn tại!');
  }
  const clonedProduct = JSON.parse(JSON.stringify(product));
  clonedProduct.Description = he.decode(clonedProduct.Description);
  clonedProduct.Images = images;
  return { product: clonedProduct, count, originalProduct: product };
};

/**
 * Change record value and save
 * @param {Product} product - product record
 * @param {Object} body - Request body
 * @returns {Promise<SaveResult>}
 */
const saveProduct = async (product, body) => {
  const {
    brandid,
    categoryid,
    categorygroupid,
    name,
    description,
    price,
    rate,
    quantity,
    images,
    isbestseller,
  } = body;
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
  if (rate) {
    product.Rate = rate;
  }
  if (quantity) {
    product.Quantity = quantity;
  }
  if (images) {
    if (!product.ImageURL && images[0].OriginalImageUrl) {
      product.ImageURL = images[0].OriginalImageUrl;
    }
    await Promise.all(
      images.map((img) =>
        Image.update(
          { ProductId: product.Id },
          {
            where: {
              Id: img.Id,
            },
          }
        )
      )
    );
  }
  if (isbestseller) {
    product.IsBestSeller = isbestseller;
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
  const {
    brandid,
    categoryid,
    categorygroupid,
    name,
    description,
    price,
    quantity,
    images,
    isbestseller,
  } = body;

  if (name && brandid) {
    const existingProduct = await Product.findOne({ where: { Name: name, BrandId: brandid } });
    if (existingProduct) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Tên này đã tồn tại!');
    }
  }

  const newProduct = await Product.create({
    BrandId: brandid,
    CategoryId: categoryid,
    CategoryGroupId: categorygroupid,
    Name: name,
    Description: description,
    ImageURL: images[0].OriginalImageUrl,
    Price: price,
    Quantity: quantity || 0,
    IsBestSeller: isbestseller || false,
  });

  await Promise.all(
    images.map((img) =>
      Image.update(
        { ProductId: newProduct.Id },
        {
          where: {
            Id: img.Id,
          },
        }
      )
    )
  );
  return newProduct.get({ plain: true });
};

module.exports = { queryProducts, queryProductById, saveProduct, destroyProduct, createOneProduct };
