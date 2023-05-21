const httpStatus = require('http-status');
const {
  queryProducts,
  queryProductById,
  createOneProduct,
  saveProduct,
  destroyProduct,
} = require('../services/product.service');
const catchAsync = require('../utils/catchAsync');

const getProducts = catchAsync(async (req, res) => {
  try {
    const Products = await queryProducts(req.query);
    res.status(httpStatus.OK).json({ Products, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách sản phẩm!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getProductById = async (req, res) => {
  try {
    const { product, count } = await queryProductById(req.params.productId);
    return res.status(httpStatus.OK).json({ success: true, totalReview: count, product });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm sản phẩm!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { originalProduct: product } = await queryProductById(req.params.productId);
    await saveProduct(product, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm sản phẩm!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { originalProduct: product } = await queryProductById(req.params.productId);
    await destroyProduct(product);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá sản phẩm!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createProduct = catchAsync(async (req, res) => {
  try {
    const createdProduct = await createOneProduct(req.body);
    if (createdProduct) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo sản phẩm thành công!', success: true, ...createdProduct });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo sản phẩm!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct,
};
