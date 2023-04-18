const httpStatus = require('http-status');
const {
  queryAddresss,
  queryAddressById,
  createOneAddress,
  saveAddress,
  destroyAddress,
} = require('../services/address.service');
const catchAsync = require('../utils/catchAsync');

const getAddresss = catchAsync(async (req, res) => {
  try {
    const Addresss = await queryAddresss({ ...req.query, user: req.user });
    res.status(httpStatus.OK).json({ ...Addresss, success: true });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi lấy danh sách địa chỉ!',
      detail: error.message || error,
      success: false,
    });
  }
});

const getAddressById = async (req, res) => {
  try {
    const address = await queryAddressById(req.params.addressId);
    return res.status(httpStatus.OK).json({ ...address, success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm địa chỉ!',
      detail: err.message || err,
      success: false,
    });
  }
};

const updateAddressById = async (req, res) => {
  try {
    const address = await queryAddressById(req.params.addressId);
    await saveAddress(address, req.body);

    return res.status(httpStatus.OK).json({ message: 'Cập nhật thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tìm địa chỉ!',
      detail: err.message || err,
      success: false,
    });
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const address = await queryAddressById(req.params.addressId);
    await destroyAddress(address);

    return res.status(httpStatus.OK).json({ message: 'Xoá thành công!', success: true });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi xoá địa chỉ!',
      detail: err.message || err,
      success: false,
    });
  }
};

const createAddress = catchAsync(async (req, res) => {
  try {
    const createdAddress = await createOneAddress({ ...req.body, user: req.user });
    if (createdAddress) {
      res
        .status(httpStatus.OK)
        .json({ message: 'Tạo địa chỉ thành công!', success: true, ...createdAddress });
    }
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Lỗi tạo địa chỉ!',
      detail: error.message || error,
      success: false,
    });
  }
});

module.exports = {
  getAddresss,
  getAddressById,
  updateAddressById,
  deleteAddressById,
  createAddress,
};
