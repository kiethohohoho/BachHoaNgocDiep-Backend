const httpStatus = require('http-status');
const {
  queryProducts,
  queryProductById,
  createOneProduct,
} = require('../services/product.service');
const catchAsync = require('../utils/catchAsync');

const getProducts = catchAsync(async (req, res) => {
  try {
    const products = await queryProducts(req.query);
    res.status(httpStatus.OK).json({ products, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_errorOR).json({
      message: 'Lỗi lấy danh sách sản phẩm!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getProductById = async (req, res) => {
  try {
    const product = await queryProductById(req.params);
    return res.status(httpStatus.OK).json({ product, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_errorOR).json({
      message: 'Lỗi tìm sản phẩm!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createProduct = catchAsync(async (req, res) => {
  try {
    const createdProduct = await createOneProduct(req.body);
    res.status(httpStatus.OK).json({ ...createdProduct, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_errorOR).json({
      message: 'Lỗi lấy danh sách sản phẩm!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
